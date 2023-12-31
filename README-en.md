(This text is a translation of a Japanese text. The sentence may be incorrect.)

# Misskey-TL-Filter
Browser Extension at misskey that allows you to apply specific hide filters to posts

　  

# Support for other servers
This extension is initially configured to work only on Misskey.io, but users can configure it to work on other sites as well.
* Access https://Misskey.io once, with or without an account.
* Click on the extension icon in this state to open the settings window.  
>(If you are using Chrome, click on the puzzle piece icon in the upper right corner, and you will see a list of the extensions you currently have.
  You can also click the pin icon on the right to have it always displayed at the top of your browser.)  
! [image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/4ad28793-a2bf-4b70-961f-754ee53042ba)
* Scroll down the configuration page and enter the name of the server you want to run in the "Run on other servers" option at the bottom.
>Example: ` misskey.art `  
>If you have more than one server you want to run, enter ` misskey.design,nijimiss.moe,misskey.04.si `.

By accessing your server in this state, the extension will be activated.  
However, we do not guarantee that it will work with anything other than misskey.io. It may not work.  

　  
   
# Supported Browser and site
Chrome(windows,macOS), Chromium Browser, Firefox  
If you want to use on a server other than Misskey.io, please also see **Support for other servers** below!  
If you want to use on Firefox, please also see **For Firefox**.

　  

# Features
Opening https://Misskey.io activates the extension.  
Clicking on the extension icon with misskey.io open will open the various filter settings.

![image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/f5e12963-9ad5-41a1-99b2-a69caca5d44e)
![image](https://github.com/ikakonbu/Misskey-TL-Filter/assets/82440954/844bd595-ebf0-462c-97b6-293e0fabbed0)

In the upper section, you can set the filtering to be applied to each Timeline.  

* **Hide RN** Hide a all renotes.
* **Hide Quotes** hides all quoted notes
* **Hide NSFW** hides all notes with images or videos attached that have been set NSFW (sensitive media).
* **Hide CW** Hides all notes whose text is hidden in `Show Content`
* **Hide Media** Hide notes which include image, videos (Can be set in local,profile,list)
* **Hide Bot** Hide bot's notes (local, social only)
* **ローカルを非表示 Hide Local** hide posts from the your server (can be set in global only)
  
The middle section is an option that applies to all timeline
* **Hide notes from channel** Hides all notes set for channel notes.
* **Hide notes with images,videos** Hides notes with images and videos attached
* **Hide notes except those with images,videos** Hides all notes except those with images or videos attached.
* **Hide notes posted from same server** hide all notes posted from same server.
* **Hide notes posted from different server**Hide posts from servers other than the one you belong to
* **Mute specific users"** Hides all notes from the user ID set in the right input field.
* **Mute user's renote** Hides all renotes from the user ID set in the right input field
  
>Example: If you hide all note from 村上さん(@AureoleArk) and しゅいろ(@syuilo),  Please input ` AureoleArk,syuilo `
>if you hide other server (@ikakonbu@nijimiss.moe), Please input ` ikakonbu@nijimiss.moe `

The under section is other options.
* **Hide the number: following and follower"** Hide the number of follows and followers
* **Better design for emoji piccker** Change the layout of the reaction picker to display horizontal emojis more legibly.instead of squares in the emojis selection screen to make it easier to type emojis
* **Use other servers** If you are running on a server that is not on the "server list" below, please enter the domain name of the server here.
* **Export filtering setting as CSS**　Output the current settings as CSS code. If you are using misskey from a browser on another device, you can paste the output code into 'Settings → General → Custom CSS' to use the same filtering settings.  (This will not work with third-party client apps.)

   

　  

# How to Install
* Chrome WebStore(for chrome, edge, opera)
https://chrome.google.com/webstore/detail/misskey-tl-filter/gligjcdfcokjfdkpmjgncgdoefnpkpej
* Firefox Add-on (for Firefox)
https://addons.mozilla.org/ja/firefox/addon/misskey-tl-filter/

For development and debugging purposes, or if you want to use something in the development stage at an early stage, you can install it manually from the source code here.   
Download the zip file and follow the manual installation instructions for your browser.  

　  

# Plans for future feature additions
* None at this time.　If you have a feature you would like to see improved, please contact me.
 
　  
# For Firefox users
In firefox, some features that are supported by other browsers are turned off by default, and this is why they do not work properly.  
Therefore, you need to change the settings by following the steps below.
* Type ` about:config ` in the URL field and enter
* A warning screen will appear, but ignore it and proceed.
* In the search bar of the screen that comes up, type `layout.css.has-selector.enabled` to bring up a setting with this name.
* Double click on the setting that comes up and set the value to `**True**`.
* Restart Firefox and go to misskey.io.
(In some cases, you may need to reload the page a couple of times to get it to work properly.

　  

# About feature addition requests and bug reports
If you have something to say about feature additions or bug reports, please feel free to DM me at my misskey account or post an issue on github.  

　  

# Lisence
The MIT License

Copyright(c) ２０２３ ikakonbu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

