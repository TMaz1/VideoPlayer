document.addEventListener( "DOMContentLoaded", initialiseWebPage ); //the function initialiseWebPage will be called when the HTML document is loaded

function initialiseWebPage() //when the HTML of the web-page is loaded. this function will be loaded
{
	const myVideo            = document.querySelector( "video" ); //calls the HTML "document". gets the selector "video" thus can have interactivity with javascript
	myVideo.removeAttribute( "controls" ); //removes the default controls so i can code controls & video is compatible with other browsers
	
	const playButton         = document.getElementById( "playPause" ); //calls the HTML document. gets the value "playPause", from first button selector, by its assigned id & renames it as a constant "playButton"
	let isPaused             = false; //global boolean variable that is true when the video is paused
	const muteButton         = document.getElementById( "muteUnmute" ); ////calls the HTML document. gets the value "muteUnmute", from second button selector, by its assigned id & renames it as a constant "muteButton"
	const scrubSlider        = document.getElementById( "seekBar" ); //calls the HTML document. gets the value "seekBar", from input element (type as range), by its assigned id & renames it as a constant "scrubSlider"
	const volumeSlider       = document.getElementById( "volBar" ); //calls the HTML document. gets the value "volBar", from input element (type as range), by its assigned id & renames it as a constant "volumeSlider"
	const volumeLabel        = document.getElementById( "volumeLabel" ); //calls the HTML document. gets the value "volumeLabel", from label element, by its assigned id & renames it as a constant "volumeLabel"
	const durationDisplay    = document.getElementById ( "durationField" ); //calls the HTML document. gets the value "durationField", from input element (type as text), by its assigned id & renames it as a constant "durationDisplay"
	const currentTimeDisplay = document.getElementById ( "currentTimeField" ); //calls the HTML document. gets the value "currentTimeField", from input element (type as text), by its assigned id & renames it as a constant "currentTimeDisplay"
	const playbackSpeed      = document.getElementById ( "playbackSpeedList" ); //calls the HTML "document. gets the value "playbackSpeedList", from select selector, by its assigned id & renames it as a constant "playbackSpeed"
	const forwardStepButton  = document.getElementById ( "forwardStep" ); //calls the HTML "document. gets the value "playbackSpeedList", from select selector, by its assigned id & renames it as a constant "playbackSpeed"
	const backwardStepButton = document.getElementById ( "backStep" ); //calls the HTML "document. gets the value "playbackSpeedList", from select selector, by its assigned id & renames it as a constant "playbackSpeed"
		
		
		
	function togglePlayVideo()
	{
		 //if statement; outcome differs depending on conditions
		if ( myVideo.paused === true ) //video is paused
		{
			myVideo.play(); //the DOM play method plays the video, when clicked
			playButton.innerHTML = "&#9616;&#9616;"; //updates inside HTML button selector: turns into a pause icon made from two same Unicode characters
			isPaused = false; //boolean variable is assigned to false
		}
		else //if the video is playing
		{
			myVideo.pause(); //the DOM pause method pauses the video, when clicked
			playButton.innerHTML = "&#9658;" ; //updates inside HTML button selector when clicked: turns into a right-pointing pointer made from single Unicode character
			isPaused = true; //boolean variable is assigned to true
		} //ends if statement
	} //ends function "togglePlayVideo"
	playButton.addEventListener ( "click", togglePlayVideo ); //click event is fired when play button is clicked thus calls togglePlayVideo function
	
	function toggleMuteVideo()
	{
		//if statement; outcome differs depending on conditions
		if ( myVideo.muted === false ) //video is unmuted/volume is on
		{
			myVideo.muted = true; //the video is muted, when clicked
			muteButton.innerHTML = "Unmute"; //updates inside HTML button selector when clicked: button will display "Unmute"
			volumeSlider.value = 0; //value set to zero: the slider responds to video muting
			volumeLabel.innerHTML = volumeSlider.value; //updates inside HTML label selector when mute button is clicked: turns into zero
		}
		else //if the video is muted
		{
			myVideo.muted = false; //the video is unmuted, when clicked
			muteButton.innerHTML = "Mute" ; //updates inside HTML button selector when clicked: button will display "Mute"
			volumeSlider.value = 5; //value set to five: the slider responds to video muting
			volumeLabel.innerHTML = volumeSlider.value; //updates inside HTML label selector when mute button is clicked: turns into five
		} //ends else & if statement
	} //ends function "toggleMuteVideo"
	muteButton.addEventListener ( "click", toggleMuteVideo ); //click event is fired when mute button is clicked thus calls toggleMuteVideo function

	function scrubVideo()
	{
		const scrubTime = myVideo.duration * ( scrubSlider.value/100 ); //to get the time on the slider; a percentage is formed from the duration of the video multiplied by the slider value divided by 100
		myVideo.currentTime = scrubTime; //whenever the user uses the slider, it will show the current time of the video (e.g. 100% will be when the video ends)
	}
	scrubSlider.addEventListener ( "input", scrubVideo ); //input event is fired when slider is moved thus calls scrubVideo function. allow for video playback to change as the slider position changes 

	function movePlaySlider()
	{
		scrubSlider.value = ( myVideo.currentTime/myVideo.duration )* 100; //creates a percentage to match the slider position to the current playback time
	}
	myVideo.addEventListener ( "timeupdate", movePlaySlider ); //timeupdate event fires continuously when the video plays thus calls movePlaySlider function: moves the slider as the time changes.

	function scrubVolume()
	{
		myVideo.volume = ( volumeSlider.value / 10 ); //volume will be slider's value in intervals of 1; where 10 is the highest volume
		volumeLabel.innerHTML = volumeSlider.value; //updates inside HTML label selector when slider is moved into whatever value of slider e.g. volumeSlider scrub is on far left, label is '0'
		//if statement; outcome differs depending on conditions
		if ( volumeSlider.value <= 0 )
		{
			muteButton.innerHTML = "Unmute"; //updates inside HTML button selector when clicked: button will display "Unmute"
			//nested if statement; outcome differs depending on conditions
			if ( myVideo.muted === false ) //video is unmuted/volume is on
			{
				myVideo.muted = true; //the video is muted, when clicked
			} //end nested if statement
		}
		else //if the volume bar is greater than zero
		{
			muteButton.innerHTML = "Mute"; //updates inside HTML button selector when clicked: button will display "Mute"
			//nested if statement; outcome differs depending on conditions
			if ( myVideo.muted === true ) //video volume is off
			{
				myVideo.muted = false; //the video is unmuted, when clicked
			} //end nested if statement
		} //end if statement
	} //ends function "scrubVolume"
	volumeSlider.addEventListener ( "input" , scrubVolume ); //input event is fired when slider is moved thus calls scrubVolume function: allow for volume to change as the slider position changes 
	muteButton.addEventListener ( "click", scrubVolume ); //click event is fired when mute button is clicked thus calls scrubVolume function: creates a connection & communicate with the volumeSlider (e.g. when volume bar is 0, the button will say "unmute")

	function displayCurrentTime()
	{
		//display current playback time in minutes and seconds - MinutesMinutes:SecondsSeconds
		let minutes = Math.floor ( myVideo.currentTime / 60 ); //divides the current playback time by 60 & uses Math.floor to round the real number into an integer (whole number)
		let seconds = Math.floor ( myVideo.currentTime % 60 ); //gets the remainder of the currentTime of the video and thus will represent the seconds - uses Math.floor to round the real number into an integer (whole number)
		
		//if statements; outcome differs depending on conditions
		if ( minutes < 10 )
		{
			minutes = "0" + minutes; //current time is less than 10 minutes: a zero is in front e.g. "01:00", instead of "1:00"
		} //end if statement
		
		if ( seconds < 10 )
		{
			seconds = "0" + seconds; //current time is less than 10 seconds: a zero is in front e.g. "00:09", instead of "00:9"
		} //end if statement
		currentTimeDisplay.setAttribute ( "value", ( minutes + ":" + seconds) ); //sets value for currentTimeDisplay to the minutes and seconds of the current playback time
	}
	myVideo.addEventListener ( "timeupdate", displayCurrentTime ); //timeupdate event fires continuously when the video plays thus calls displayCurrentTime function: text field changes to playback time
	
	function displayDurationTime()
	{
		//display duration of the video in minutes and seconds - MinutesMinutes:SecondsSeconds
		let minutes = Math.floor ( myVideo.duration / 60 ); //divides the current playback time by 60 & uses Math.floor to round the real number into an integer (whole number)
		let seconds = Math.floor ( myVideo.duration % 60 ); //gets the remainder of the currentTime of the video and thus will represent the seconds - uses Math.floor to round the real number into an integer (whole number)
		
		//if statements; outcome differs depending on conditions
		if ( minutes < 10 )
		{
			minutes = "0" + minutes; //display time is less than 10 minutes: a zero is in front e.g. "01:00", instead of "1:00"
		} //end if statement
		
		if ( seconds < 10 )
		{
			seconds = "0" + seconds; //display time is less than 10 seconds: a zero is in front e.g. "00:09", instead of "00:9"
		} //end if statement
		durationDisplay.setAttribute ( "value", ( minutes + ":" + seconds) ); //sets value for durationDisplay to the minutes and seconds of the entire duration playback time
	}
	myVideo.addEventListener ( "durationchange", displayDurationTime ) ; //durationchange event is fired when the video loads thus calls displayCurrentTime function: assign duration of video to text field

	function changePlayBackSpeed()
	{
		myVideo.playbackRate = playbackSpeed.value; //the playback rate will change depending on what the value is within the option tags in the HTML document
	}
	playbackSpeed.addEventListener( "change", changePlayBackSpeed ); //change event is fired when the option selected changes thus calls changePlayBackSpeed function. allow for playback speed to change

	function skipForward10Sec()
	{
		myVideo.currentTime = myVideo.currentTime + 10; //the playback time increases by ten second
	}
	forwardStepButton.addEventListener ( "click", skipForward10Sec ); //click event is fired when forwardStepButton button is clicked thus calls skipForward10Sec function 

	function skipBackward30Sec()
	{
		myVideo.currentTime = myVideo.currentTime - 30; //the playback time decreases by 30 seconds
	}
	backwardStepButton.addEventListener ( "click", skipBackward30Sec ); //click event is fired when backwardStepButton button is clicked thus calls skipBackward30Sec function 
	
	function skipBackwardToStart()
	{
		myVideo.currentTime = 0; //the playback time returns back to 0 seconds
		//if statement; outcome differs depending on conditions
		if ( myVideo.currentTime === 0 )
		{
			myVideo.pause(); //the DOM pause method pauses the video, when clicked
			playButton.innerHTML = "&#9658;" ; //updates inside HTML button selector when clicked: turns into a right-pointing pointer made from single Unicode
			myVideo.load(); //DOM load() method re-loads the video
			scrubSlider.value = 0; //reset the slider for video playback to zero
		} //end if statement
	}
	backwardStepButton.addEventListener ( "dblclick", skipBackwardToStart ); //dblclick event is fired when backwardStepButton button is double-clicked thus calls skipBackwardToStart function

	function pauseHiddenVideo()
	{	
		//if statement; outcome differs depending on conditions
		if ( document.hidden === true ) //the user has switched tabs or the webpage is minimized
		{	
			myVideo.pause() ; //the DOM pause method pauses the video, when clicked
			playButton.innerHTML = "&#9658;"; //updates inside HTML button selector when clicked: turns into a right-pointing pointer made from single Unicode
		}
		else if( document.hidden === false && isPaused === false ) //webpage is on display AND video was initially playing
		{	
			myVideo.play();  //the DOM play method plays the video, when clicked
			playButton.innerHTML = "&#9616;&#9616;"; //updates inside HTML button selector: turns into a pause icon made from two same Unicode characters
		} //end if statement
	}
	document.addEventListener ( "visibilitychange", pauseHiddenVideo ); //visibilitychange event is fired when the content of tab is hidden/unhidden thus calls pauseHiddenVideo function 

	function activateKeyboardShortcuts(event) //the parameter 'event' is passed into function
	{ 
		switch( event.key ) //switch case statement on one variable and it's 'key' property: different keys pressed result in different outputs
		{
			case ' ': //if the SPACE key is pressed and released
				playButton.click(); //fires the playButton's click event
				break; //ends case
				
			case 'm': //if the M key is pressed and released
				muteButton.click(); //fires the muteButton's click event
				break; //ends case
				
			case 'ArrowUp': //if the Arrow Up (north) key is pressed and released
				volumeSlider.value += 1 ; //increases the volume value by one interval
				scrubVolume(); //calls scrubVolume function for functionality
				break; //ends case
				
			case 'ArrowDown': //if the Arrow Down (south) key is pressed and released
				volumeSlider.value -= 1 ; //decreases the volume value by one interval
				scrubVolume(); //calls scrubVolume function for functionality
				break; //ends case
				
			case 'ArrowLeft': //if the Arrow Left (west) key is pressed and released
				myVideo.currentTime = myVideo.currentTime - 10; //reassigns the video time to 10 seconds before
				break; //ends case
				
			case 'ArrowRight': //if the Arrow Right (east) key is pressed and released
				skipForward10Sec() //calls skipForward10Sec function for functionality
				break; //ends case
		} //end switch case statement
	}
	document.addEventListener ( "keyup", activateKeyboardShortcuts ); //keyup event is fired when when a key is released thus calls activateKeyboardShortcuts function 
	
} //ends initialiseWebPage function

		