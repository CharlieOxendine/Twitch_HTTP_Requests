var httpRequest = new XMLHttpRequest();

httpRequest.addEventListener('load', clipsLoaded);
httpRequest.open('GET', 'https://api.twitch.tv/kraken/clips/top?limit=20&trending=true');
httpRequest.setRequestHeader('Client-ID', '<YOUR CLIENT ID>');
httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
httpRequest.send(null);

function clipsLoaded(data) 
{
  var clipsDisplay = document.getElementById('clips-display'),
  clipList = JSON.parse(httpRequest.responseText);
  console.log(clipList); //logs return data from server in javascript console.

  //getting the thumbnail for each video that is retrieved by the httpRequest above.
  clipList.clips.forEach(function(clip, index, array) 
  {
    clipItem = document.createElement('a');
    metaData = document.createElement('div')
    Desc = document.createElement('p');
    clipAuthor = document.createElement('p');
    viewCount = document.createElement('p');
    
    document.body.appendChild(clipItem);
    clipItem.appendChild(metaData);
    metaData.appendChild(Desc);
    metaData.appendChild(clipAuthor);
    metaData.appendChild(viewCount);

    clipsDisplay.appendChild(clipItem);
    var embedURL = clip.embed_url;
    clipItem.href = embedURL;
    
    var url = clip.thumbnails.medium;
    var title = clip.title;
    var creator = clip.curator.name;
    var views = clip.views;
    var img = new Image(); //(width,height) of image created
    var titleNode = document.createTextNode(title);
    var authorNode = document.createTextNode('by: '+creator);
    var viewsNode = document.createTextNode(views + ' views');



    img.setAttribute("style", "max-width: 20vw;");
    img.src = url;
    clipItem.appendChild(img);
    Desc.appendChild(titleNode);
    clipAuthor.appendChild(authorNode);
    viewCount.appendChild(viewsNode);
  });
}
