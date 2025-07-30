(function() {
  try {
    // Helper to extract number from text like "57,773 clusters" → 57773
    const extractNumber = (text) => {
      const match = text.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(/,/g, ''), 10) : '';
    };

    // Grab block name
    const blockNameElem = document.querySelector('h1.text-xl span.font-bold');
    const blockName = blockNameElem ? blockNameElem.innerText.trim() : '';

    // Vineyard name (you might want to hardcode or parse this depending on your setup)
    const vineyard = ''; // ← fill this in if available elsewhere

    // Grab scanned acres
    const acresElem = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent.includes('Acreage'))?.nextElementSibling;
    const scannedAcres = acresElem ? extractNumber(acresElem.textContent) : '';

    // Total clusters and calibrated flag
    const totalClustersLabel = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent.includes('Total clusters'));
    const totalClustersValue = totalClustersLabel?.nextElementSibling?.innerText ?? '';
    const calibrated = totalClustersLabel?.textContent.includes('calibrated') ? 'Y' : 'N';
    const clustersCounted = extractNumber(totalClustersValue);

    // Clusters per vine
    const clustersPerVineLabel = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent.includes('Clusters per vine'));
    const clustersPerVine = extractNumber(clustersPerVineLabel?.nextElementSibling?.innerText ?? '');

    // Missing vines
    const missingVinesLabel = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent.includes('Vines Missing'));
    const missingVines = extractNumber(missingVinesLabel?.nextElementSibling?.innerText ?? '');

    // Prompt to determine which camera pass this is
    const camNumber = prompt('Which camera pass is this? Enter 1 or 2:');
    if (!['1', '2'].includes(camNumber)) {
      alert('Invalid camera number. Enter 1 or 2.');
      return;
    }

    // Format row according to spec
    const row = {
      Vineyard: vineyard,
      Block: blockName,
      [`Cam ${camNumber} clusters counted`]: clustersCounted,
      [`Cam ${camNumber} clusters/vine`]: clustersPerVine,
      [`Cam ${camNumber} missing vines`]: missingVines,
      'total counted clusters': '',            // manual entry
      'average clusters per vine': '',         // manual entry
      'Callibrated Y / N': calibrated,
      'GTS Y/N': '',                           // manual entry
      'Scanned Acres': scannedAcres
    };

    console.log('Parsed row:', row);

    // TODO: send to Google Sheets if desired

    alert('Data extracted. See console (F12) for results.');

  } catch (e) {
    console.error('Error extracting data:', e);
    alert('An error occurred. Check console for details.');
  }
})();
