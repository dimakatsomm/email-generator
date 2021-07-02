document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.drop-zone > input').forEach((inputElement) => {
  const dropZoneElement = inputElement.closest('.drop-zone');
  const labelElement = inputElement.closest('span');

  dropZoneElement.addEventListener('click', (e) => {
    inputElement.click();
  });

  inputElement.addEventListener('change', (e) => {  
    if (inputElement.files.length) {
      labelElement.innerHTML = inputElement.files[0].name
    }
  });

  dropZoneElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZoneElement.classList.add('drop-zone--over');
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove('drop-zone--over');
    });
  });

  dropZoneElement.addEventListener('drop', (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      labelElement.innerHTML = inputElement.files[0].name
    }

    dropZoneElement.classList.remove('drop-zone--over');
  });
  });

  const disclaimerElement = document.getElementById('disclaimer');

  disclaimerElement.addEventListener('change', (e) => {

  if (disclaimerElement.checked) {
    let sigDiv = document.getElementById('signatureSimple');
    let sigTable = sigDiv.querySelector('table');
    let disclaimer = sigTable.insertRow(-1)
    let disclaimerCell = disclaimer.insertCell(0);
    let lineBreak = document.createElement('br');
    let disclaimerText = document.createElement('p');

    disclaimerText.innerHTML = 'CONFIDENTIAL: This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.';
    disclaimer.setAttribute('id', 'disclaimerText');    
    disclaimerCell.setAttribute('colspan', '3');
    disclaimerCell.appendChild(lineBreak);
    disclaimerCell.appendChild(disclaimerText)
    disclaimerText.setAttribute('style', 'font-size: xx-small; color: #333333;')
   
  } else {
    let disclaimer = document.getElementById('disclaimerText')

    if (disclaimer)
      disclaimer.remove();
  }
  });
});

const addSocialMedia = (element, network) => {
  let socialMediaItem = document.getElementById(network);

  if (!(element && element.value) && socialMediaItem) {
    socialMediaItem.remove();
    return
  }
  
  let socialMediaRow = document.getElementById('socialMedia');
  let iconLink, altText, socialMediaLink, socialMediaList;

  switch (network) {
    case 'facebook':
      iconLink = 'assets/img/theme/simple/facebook.png'
      altText = 'Let\'s be friends on Facebook.'
      break;
    
    case 'instagram':
      iconLink = 'assets/img/theme/simple/instagram.png'
      altText = 'Follow me on Instagram!'
      break;
  
    case 'linkedin':
      iconLink = 'assets/img/theme/simple/linkedin.png'
      altText = 'Let\'s be friends on Facebook.'
      break;

    case 'twitter':
      iconLink = 'assets/img/theme/simple/twitter.png'
      altText = 'Connected with me on LinkedIn!'
      break;
    default:
      return;
  }

  if (!socialMediaRow) {
    let sigDiv = document.getElementById('signatureSimple');
    let profileTable = sigDiv.querySelector('table table');

    socialMediaRow = profileTable.insertRow(-1);
    socialMediaRow.setAttribute('id', 'socialMedia');

    let socialMediaCell = socialMediaRow.insertCell(0);
    socialMediaCell.setAttribute('colspan', '2');
    socialMediaCell.setAttribute('style', 'padding-top: 5px;');

    socialMediaList = document.createElement('ul');
    socialMediaList.setAttribute('style', 'list-style: none; padding: 0; margin: 0; height: 25px;');
    socialMediaCell.appendChild(socialMediaList);
  } else {
    socialMediaList = socialMediaRow.querySelector('ul');
    socialMediaLink = socialMediaRow.querySelector('a');
  }

  if (!socialMediaItem) {
    socialMediaItem = document.createElement('li');
    socialMediaLink = document.createElement('a');
    socialMediaIcon = document.createElement('img');

    socialMediaItem.setAttribute('id', network);
    socialMediaItem.setAttribute('style', 'display: inline-block;');
    socialMediaList.appendChild(socialMediaItem);

    socialMediaItem.appendChild(socialMediaLink)
    socialMediaLink.setAttribute('style', 'text-decoration: none;');
    socialMediaLink.appendChild(socialMediaIcon);

    socialMediaIcon.setAttribute('src', iconLink);
    socialMediaIcon.setAttribute('style', 'width: 25px; height: 25px;');
    socialMediaIcon.setAttribute('alt', altText);
  }

  socialMediaLink.setAttribute('href', element.value);
}

const updateValue = (element, outputId) => {
  if(!outputId)
    return
  
  let outputValue = document.getElementById(outputId);
  
  if(outputValue)
    outputValue.innerHTML = element.value;
}

const updateLink = (element, outputId) => {
  if(!outputId)
    return

  let outputValue = document.getElementById(outputId);

  if(outputValue) {
    outputValue.innerHTML = element.value;
    outputValue.href = element.value;
  }
}

const updateImage = (element, outputId) => {
  if(!outputId)
    return

  let outputValue = document.getElementById(outputId);

  if (element.files && element.files[0]) {
    let reader = new FileReader();
    let fileName = element.files[0].name;

    reader.onload = (event) => {
      if (outputValue)
        outputValue.src = event.target.result;
    }

    element.classList.add('upload-success');
    reader.readAsDataURL(element.files[0]);
  } else {
    element.classList.remove('upload-success');

    if (labelText)
      labelText.innerHTML = '';

    if (outputValue)
        outputValue.src = '';
  }
}

const updateEmail = (element, outputId) => {
  if(!outputId)
    return

  let outputValue = document.getElementById(outputId);

  if (outputValue) {
    outputValue.innerHTML = element.value;
    outputValue.href = `mailto:${element.value}`;
  }
}

const copySignature = () => {
  let text = document.getElementById('signatureSimple');
  let dummy = document.createElement('textarea');

  document.body.appendChild(dummy);

  dummy.value = text.innerHTML;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  alert('Copied to clipboard!');
}