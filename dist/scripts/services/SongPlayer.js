(function() {
    function SongPlayer($rootScope, Fixtures) {
     var SongPlayer = {};
        
 /**
 * @desc variable to collect album data from Ficture injection
 * @type {Object}
 */
        
     var currentAlbum = Fixtures.getAlbum();
     
        /**
 * @desc Buzz object audio file
 * @type {Object}
 */
        
     var currentBuzzObject = null;

     /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
        
        
        var setSong = function(song) {
        if (currentBuzzObject) {
        stopSong();
        }
 
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
 
        currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });    
        
        SongPlayer.currentSong = song;
 };
        
// * @function playSong
// * @desc plays song file as currentBuzzObject and updates song boolean
// * @param {Object} song
// */
        
        var playSong = function(song) {
            
            currentBuzzObject.play(); 
            song.playing = true;
        };

    
// * @function getSongIndex
// * @desc gets the index of a selected song (playing song)
// * @param {Object} song
// */
        
     var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
        
/**@function stopSong
 * @desc stops the current playing song and resets the song to null
 */ 
        
        
    var stopSong = function (){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    };
        
        
/**
 * @desc song audio file
 * @type {Object}
 */
    
    SongPlayer.currentSong = null;
        
        
        /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;
        
 
// @desc sets default volume and can also changes volume 
//        * @type {Number}
//        */
        
        SongPlayer.volume = 40;


        /**
        
// * @function SongPlayer.play
// * @desc public method that plays a song file from an object when a song is not the current song or current song is paused  
// * @param {Object} song
// */
        
        
        SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
           
            setSong(song);
            playSong(song);
         } else if (SongPlayer.currentSong === song) {
            
             if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
     }    
     };
        
// * @function SongPlayer.pause
// * @desc public method that pauses a currently playing song file from an object 
// * @param {Object} song
// */
        
    SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
 };
        
// * @function SongPlayer.previous
// * @desc stores information about the previous song in the song array so that users can switch back to the previous song - used with player bar   
// */ 
        
    SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
        
     if (currentSongIndex < 0) {
         stopSong();
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
  
// * @function SongPlayer.next
// * @desc stores information about the next song in the song array so that users can switch to the next song - used with player bar   
// */     
        
      SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;
          
     if (currentSongIndex > currentAlbum.songs.length) {
         stopSong();
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
        
        /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
      SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
        }
};
        
      /**
      * @function setVolume
      * @desc sets the volume with the volume seek bar
      * @param {Number} volume
      */
      SongPlayer.setVolume = function(volume) {
          if (currentBuzzObject) {
              currentBuzzObject.setVolume(volume);
          }
          SongPlayer.volume = volume
      };
        
     return SongPlayer;
 }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();