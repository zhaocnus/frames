export default function(active, tabId) {
  const iconPath = active ?
    {
      '19': 'icons/icon19.png',
      '38': 'icons/icon38.png'
    } :
    {
      '19': 'icons/icon19-default.png',
      '38': 'icons/icon38-default.png'
    };

  chrome.browserAction.setIcon({ path: iconPath, tabId: tabId });
}
