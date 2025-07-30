(function () {
    try {
        const extractNumber = (text) => {
            const match = text.match(/[\d,]+/);
            return match ? parseInt(match[0].replace(/,/g, ''), 10) : '';
        };

        const blockNameElem = document.querySelector('h1.text-xl span.font-bold');
        const blockName = blockNameElem ? blockNameElem.innerText.trim() : '';
        const vineyard = '';

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

        const camNumber = prompt('Which camera pass is this? Enter 1 or 2:');
        if (!['1', '2'].includes(camNumber)) {
            alert('Invalid camera number. Enter 1 or 2.');
            return;
        }

        const row = {
            Vineyard: vineyard,
            Block: blockName,
            [`Cam ${camNumber} clusters counted`]: clustersCounted,
            [`Cam ${camNumber} clusters/vine`]: clustersPerVine,
            [`Cam ${camNumber} missing vines`]: missingVines,
            'total counted clusters': '',
            'average clusters per vine': '',
            'Callibrated Y / N': calibrated,
            'GTS Y/N': '',
            'Scanned Acres': scannedAcres
        };

        console.log('Parsed row:', row);
        alert('Data extracted. See console (F12) for results.');

        // Expose a function on window to get the extracted data
        window.__vineyardData = row;

        // Expose a function to send the data to a URL
        window.sendVineyardData = function (url) {
            if (!url) {
                alert('No URL provided to send data.');
                return;
            }
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row)
            })
                .then(response => {
                    if (response.ok) {
                        alert('Data sent successfully!');
                    } else {
                        alert('Failed to send data. Status: ' + response.status);
                    }
                })
                .catch(err => {
                    alert('Error sending data: ' + err.message);
                });
        };

    } catch (e) {
        console.error('Error extracting data:', e);
        alert('An error occurred. Check console for details.');
    }
})();
