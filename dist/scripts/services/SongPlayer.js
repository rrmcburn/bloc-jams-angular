(function() {
    function SongPlayer() {
     var SongPlayer = {};
        
 /**
 * @desc song audio file
 * @type {Object}
 */
    
    var currentSong = null;
     
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
        currentBuzzObject.stop();
        currentSong.playing = null;
        }
 
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
 
    currentSong = song;
 };
        
// * @function playSong
// * @desc plays song file as currentBuzzObject and updates song boolean
// * @param {Object} song
// */
        
        var playSong = function(song) {
            
            currentBuzzObject.play(); 
            song.playing = true;
        };

        
// * @function SongPlayer.play
// * @desc public method that plays a song file from an object when a song is not the current song or current song is paused  
// * @param {Object} song
// */
        
        
        SongPlayer.play = function(song) {
         
         if (currentSong !== song) {
           
            setSong(song);
            playSong(song);
         } else if (currentSong === song) {
            
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
     currentBuzzObject.pause();
     song.playing = false;
 };
        
     return SongPlayer;
 }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();