export function printDocumentDataSheet(data, i) {
  const $fileDetails = data.get('data')[i];
  //row 1
  let res =
    '<div class="dataSheet" id="documentDataSheet">' +
    '<div class="documentDataRow">' +
    '<div class="documentDataSet">' +
    '<div class="documentDataTitle">' +
    'Type:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['type'] +
    '</div>' +
    '</div>' +
    '<div class="documentDataSet" id="documentDataCol2">' +
    '<div class="documentDataTitle">' +
    'Document ID:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['id'] +
    '</div>' +
    '</div>' +
    '</div>' +
    //row 2
    '<div class="documentDataRow">' +
    '<div class="documentDataSet">' +
    '<div class="documentDataTitle">' +
    'Type Index:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['typeIndex'] +
    '</div>' +
    '</div>' +
    '<div class="documentDataSet" id="documentDataCol2">' +
    '<div class="documentDataTitle">' +
    'Timeline ID:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['timelineId'] +
    '</div>' +
    '</div>' +
    '</div>' +
    //row 3
    '<div class="documentDataRow">' +
    '<div class="documentDataSet">' +
    '<div class="documentDataTitle">' +
    'Created on:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    formatDate($fileDetails.object['genesisDate']) +
    '</div>' +
    '</div>' +
    '<div class="documentDataSet" id="documentDataCol2">' +
    '<div class="documentDataTitle">' +
    'Created by:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['genesisUserId'] +
    '</div>' +
    '</div>' +
    '</div>' +
    //row 4
    '<div class="documentDataRow">' +
    '<div class="documentDataSet">' +
    '<div class="documentDataTitle">' +
    'Last modified on:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    formatDate($fileDetails.object['modificationDate']) +
    '</div>' +
    '</div>' +
    '<div class="documentDataSet" id="documentDataCol2">' +
    '<div class="documentDataTitle">' +
    'Modified by:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['modificationUserId'] +
    '</div>' +
    '</div>' +
    '</div>' +
    //row 5
    '<div class="documentDataRow" id="lastRow">' +
    '<div class="documentDataSet">' +
    '<div class="documentDataTitle">' +
    'Version:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['modificationCount'] +
    '</div>' +
    '</div>' +
    '<div class="documentDataSet" id="documentDataCol2">' +
    '<div class="documentDataTitle">' +
    'Predecessor ID:' +
    '</div>' +
    '<div class="documentDataItem">  ' +
    $fileDetails.object['predecessorId'] +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  return res;
}

export function printObjectDataSheet(data, i) {
  const $fileDetails = data.get('data')[i];
  const $isVerified = data.get('isVerified')[i];
  return (
    '<div class="dataSheet" id="objectDataSheet">' +
    '<div class="objectDataRow" style="border-top: 0px">' +
    '<div class="objectDataItem" id="objectDataCol1" style="font-weight: 500">Name</div>' +
    '<div class="objectDataItem" id="objectDataCol2" style="font-weight: 500">Value</div>' +
    '<div class="objectDataItem" id="objectDataCol3" style="font-weight: 500">State</div>' +
    '</div>' +
    getObjectDataRows($fileDetails, $isVerified) +
    '</div>'
  );
}

function getObjectDataRows($fileDetails, $isVerified) {
  let res = '';
  for (let itemName in $fileDetails.object['links']) {
    res +=
      '<div class="objectDataRow">' +
      '<div class="objectDataItem" id="objectDataCol1">' +
      itemName +
      '</div>' +
      '<div class="objectDataItem" id="objectDataCol2">' +
      getValueFromLink(itemName, $fileDetails) +
      '</div>' +
      ($isVerified
        ? '<div class="successCircle"></div>'
        : '<div class="failCircle"></div>') +
      '</div>';
  }
  return res;
}
export function printReferences(data, i) {
  const $fileDetails = data.get('data')[i];
  const $isVerified = data.get('isVerified')[i];
  return (
    '<div class="dataSheet" id="objectDataSheet">' +
    '<div class="objectDataRow" style="border-top: 0px">' +
    '<div class="objectDataItem" id="referencesCol1" style="font-weight: 500">Name</div>' +
    '<div class="objectDataItem" id="referencesCol2" style="font-weight: 500">Type</div>' +
    '<div class="objectDataItem" id="referencesCol3" style="font-weight: 500">Timeline ID</div>' +
    '<div class="objectDataItem" id="referencesCol4" style="font-weight: 500">ID</div>' +
    '<div class="objectDataItem" id="referencesCol5" style="font-weight: 500">State</div>' +
    '</div>' +
    getReferencesRows($fileDetails, $isVerified) +
    '</div>'
  );
}

function getReferencesRows($fileDetails, $isVerified) {
  let res = '';
  let references = $fileDetails.object['references'];
  for (let item in references) {
    console.log(item);
    res +=
      '<div class="objectDataRow">' +
      '<div class="objectDataItem" id="referencesCol1">' +
      references[item]['name'] +
      '</div>' +
      '<div class="objectDataItem" id="referencesCol2">' +
      references[item]['type'] +
      '</div>' +
      '<div class="objectDataItem" id="referencesCol3">' +
      references[item]['timelineId'] +
      '</div>' +
      '<div class="objectDataItem" id="referencesCol4">' +
      references[item]['id'] +
      '</div>' +
      ($isVerified
        ? '<div class="successCircle"></div>'
        : '<div class="failCircle"></div>') +
      '</div>';
  }
  return res;
}

function formatDate(date) {
  let parsedDate = new Date(date);
  return (
    '' +
    parsedDate.getFullYear() +
    '/' +
    ('0' + (parsedDate.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + parsedDate.getDate()).slice(-2) +
    ' | ' +
    ('0' + parsedDate.getHours()).slice(-2) +
    ':' +
    ('0' + parsedDate.getMinutes()).slice(-2)
  );
}

function getValueFromLink(itemName, $fileDetails) {
  let link = $fileDetails.object['links'][itemName];
  if (link == '') return '';
  if (itemName == 'referencedBy')
    return link.substring(
      link.indexOf('referencedBy/') + 'referencedBy/'.length,
      link.indexOf('referencedBy/') + 24 + 'referencedBy/'.length
    );
  if (itemName == 'genesisUser' || itemName == 'modificationUser')
    return link.substring(
      link.indexOf('users/') + 'users/'.length,
      link.indexOf('users/') + 24 + 'users/'.length
    );
  if (itemName == 'latest')
    return link.substring(
      link.indexOf('timelines/') + 'timelines/'.length,
      link.indexOf('timelines/') + 24 + 'timelines/'.length
    );

  return link.substring(link.indexOf('base')).replace('/objects/', '.');
}