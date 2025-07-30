(function () {
    try {
        /**
         * Extracts the first numerical value from a string.
         * @param {string} text - The text to parse.
         * @returns {number|string} - The parsed number or an empty string if not found.
         */
        const extractNumber = (text) => {
            if (!text) return '';
            const match = text.match(/[\d,.]+/); // Updated to include decimals
            return match ? parseFloat(match[0].replace(/,/g, '')) : '';
        };

        // --- 1. Scrape Data from the DOM ---

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

        // --- 2. Prompt User for Missing Information ---

        // Prompt for Vineyard, as it's not available on the page
        const vineyard = prompt('Please enter the Vineyard name:');
        if (!vineyard) {
            alert('Vineyard name is required. Aborting.');
            return;
        }

        const camNumber = prompt('Which camera pass is this? Enter 1 or 2:');
        if (!['1', '2'].includes(camNumber)) {
            alert('Invalid camera number. Please enter 1 or 2. Aborting.');
            return;
        }
        const cam = `cam${camNumber}`; // Simplified to 'cam1' or 'cam2'

        // --- 3. Construct a Clean Data Payload ---
        // This simplified structure is easier for the Google Apps Script to handle.
        const payload = {
            vineyard: vineyard,
            block: blockName,
            cam: cam, // 'cam1' or 'cam2'
            clusters: clustersCounted,
            clustersPerVine: clustersPerVine,
            missingVines: missingVines,
            acres: scannedAcres,
            calibrated: calibrated
        };

        console.log('Parsed Data Payload:', payload);
        alert('Data extracted successfully! Sending to Google Sheet...');

        // --- 4. Expose a Function to Send the Data ---
        // This function will be called by your private bookmarklet loader.
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
                body: JSON.stringify(payload) // Send the clean payload
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