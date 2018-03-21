'use strict'
Framework.AudioManager = class AudioManager {
	constructor(mainPlaylist) {
		autoBind(this)
		this.audioInstanceObj = {}
		this.mainPlaylist = mainPlaylist || {}
		this.errorEvent = function() {}
	}
	
	addSongs(playlist) {
		this.mainPlaylist =  Framework.Util.overrideProperty(playlist, this.mainPlaylist)
	}
	
	removeSong(song) {
		this.mainPlaylist[song] = null
		delete this.mainPlaylist[song]
	}
	
	removeSongs(songs) {
		for(let i = 0, len = songs.length; i < len; i++) {
			removeSong(songs[i])
		}
	}
	
	getAudioInstance(songName) {
		if(! Framework.Util.isUndefined(this.audioInstanceObj[songName])) {
			this.audioInstanceObj[songName].currentTime = 0
			return this.audioInstanceObj[songName]
		}

		var audioInstance = new Audio()
		audioInstance.preload = 'auto'		
		this.audioInstanceObj[songName] = audioInstance
		return audioInstance
	}
	
	playMusic() {
		this.play()
		this.removeEventListener('canplaythrough', playMusic, false)
	}
	
	play(audioArgs) {
		let sourceTagStr = 'source'
		let tempSource
		let audioSourceType = {
				mp3: 'audio/mpeg',
				ogg: 'audio/ogg',
				wav: 'audio/wav'
			}
		let tempName
		let songName = audioArgs['name']
		let song = this.mainPlaylist[songName]
		let oggSource= document.createElement(sourceTagStr)
		let mp3Source = document.createElement(sourceTagStr)
		let audio = {}
		if(Framework.Util.isUndefined(song)) {
			throw ('the playlist is not set or do not contain the song: ' + songName)
		}
		audio = this.getAudioInstance(songName)
		audio.addEventListener('error', this.errorEvent, false)
		for(tempName in audioArgs) {
			if (audioArgs.hasOwnProperty(tempName)) {
				audio[tempName] = audioArgs[tempName]
			}
		}
		for(tempName in song) {
			tempSource = document.createElement(sourceTagStr)
			tempSource.type = audioSourceType[tempName]
			tempSource.src= song[tempName]
			audio.appendChild(tempSource)
		} 
		audio.play()
	}
	
	pause(audioName) {
		var audio = this.audioInstanceObj[audioName]
		if(audio !== undefined && !audio.paused) {
			audio.pause()
		}
	}
	
	pauseAll() {
		for(let tempName in this.audioInstanceObj) {
			this.pause(tempName)
		}
	}
	
	resume(audioName) {
		let audio = this.audioInstanceObj[audioName]
		if(audio.paused) {
			audio.play()
		}
	}
	
	resumeAll() {
		for(let tempName in this.audioInstanceObj) {
			this.resume(tempName)
		}
	}
	
	stop(audioName) {
		let audio = this.audioInstanceObj[audioName]
		if(audio !== undefined && !audio.paused) {
			audio.pause()
			audio.currentTime = 0
		}
	}
	
	stopAll() {
		for(let tempName in this.audioInstanceObj) {
			this.stop(tempName)
		}
	}
	
	setVolume(name, volumeValue) {
		let audio = this.audioInstanceObj[name]
		audio.volume = volumeValue
	}

	
	manageMute(name, muted) {
		let audio = this.audioInstanceObj[name]
		audio.muted = muted
	}

	openVolume(name) {
		this.manageMute(name, false)
	}

	openVolumeAll() {
		for(let tempName in this.audioInstanceObj) {
			this.openVolume(tempName)
		}
	}

	mute(name) {
		manageMute(name, true)
	}

	muteAll() {
		for(let tempName in this.audioInstanceObj) {
			mute(tempName)
		}
	}
}