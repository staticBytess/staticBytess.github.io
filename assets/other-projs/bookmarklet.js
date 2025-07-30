(function () {
    try {
        /**
         * Extracts the first numerical value from a string.
         * @param {string} text - The text to parse.
         * @returns {number|string} - The parsed number or an empty string if not found.
         */
        const extractNumber = (text) => {
            if (!text) return '';
            const match = text.match(/[\d,.]+/); // Includes decimals
            return match ? parseFloat(match[0].replace(/,/g, '')) : '';
        };

        // --- 1. Scrape Data from the DOM ---

        // Vineyard is left blank; the Apps Script will match based on the Block name.
        const vineyard = '';

        const blockNameElem = document.querySelector('h1.text-xl span.font-bold');
        const blockName = blockNameElem ? blockNameElem.innerText.trim() : '';

        const acresElem = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.includes('Acreage'))?.nextElementSibling;
        const scannedAcres = acresElem ? extractNumber(acresElem.textContent) : '';

        const totalClustersLabel = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.includes('Total clusters'));
        const totalClustersValue = totalClustersLabel?.nextElementSibling?.innerText ?? '';
        const calibrated = totalClustersLabel?.textContent.includes('calibrated') ? 'Y' : 'N';
        const clustersCounted = extractNumber(totalClustersValue);

        const clustersPerVineLabel = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.includes('Clusters per vine'));
        const clustersPerVine = extractNumber(clustersPerVineLabel?.nextElementSibling?.innerText ?? '');

        const missingVinesLabel = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.includes('Vines Missing'));
        const missingVines = extractNumber(missingVinesLabel?.nextElementSibling?.innerText ?? '');

        // --- 2. Construct a Clean Data Payload ---
        // The 'cam' property is removed. The Apps Script will handle the logic.
        const payload = {
            vineyard: vineyard,
            block: blockName,
            clusters: clustersCounted,
            clustersPerVine: clustersPerVine,
            missingVines: missingVines,
            acres: scannedAcres,
            calibrated: calibrated
        };

        console.log('Parsed Data Payload:', payload);
        alert('Data extracted. Sending to Google Sheet for processing...');

        // --- 3. Expose a Function to Send the Data ---
        window.sendVineyardData = function (url) {
            if (!url) {
                alert('Error: No Google Apps Script URL was provided.');
                return;
            }
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (response.ok) {
                        alert('Data sent to Google Sheet successfully!');
                    } else {
                        response.text().then(text => {
                            alert('Failed to send data. Status: ' + response.status + '\nResponse: ' + text);
                        });
                    }
                })
                .catch(err => {
                    console.error('Error sending data:', err);
                    alert('An error occurred while sending data: ' + err.message);
                });
        };

    } catch (e) {
        console.error('Error extracting data:', e);
        alert('A critical error occurred while running the bookmarklet. Check the console (F12) for details.');
    }
})();