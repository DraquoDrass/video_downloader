const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const readlinee = require('readline').createInterface({

  input: process.stdin,
  output: process.stdout

});

function dlvideomp3(id) {

  ytdl.getInfo(id).then(async info => {

    let viname = info.videoDetails.title.replace(/\//g, '')
    viname = viname.replace(/./g, '')
    viname = viname.replace(/#/g, '')
    viname = viname.replace(/"/g, '')
    viname = viname.replace(/'/g, '')
    viname = viname.replace(/:/g, '')
    viname = viname.replace(/|/g, '')
    viname = viname.replace(/"/g, '')
    viname = viname.replace(/&/g, '')
    
    let stream = ytdl(id, {

      quality: 'highestaudio',

    });
    
    let start = Date.now();
  
    ffmpeg(stream)
      .audioBitrate(128)
      .save(`./downloads/${viname}.mp3`)
      .on('progress', p => {

        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Downloading: ${viname} (${p.targetSize}kb)`);

      })
      .on('end', () => {

        console.log(`\nDownload finished in ${(Date.now() - start) / 1000}s`);

      });

  })
}

function dlvideomp4(id) {

  ytdl.getInfo(id).then(async info => {

    let viname = info.videoDetails.title.replace(/\//g, '')
    viname = viname.replace(/./g, '')
    viname = viname.replace(/#/g, '')
    viname = viname.replace(/"/g, '')
    viname = viname.replace(/'/g, '')
    viname = viname.replace(/:/g, '')
    viname = viname.replace(/|/g, '')
    viname = viname.replace(/"/g, '')
    viname = viname.replace(/&/g, '')
    
    let stream = ytdl(id, {

      quality: 'highest',

    });
    
    let start = Date.now();
  
    ffmpeg(stream)
      .audioBitrate(128)
      .save(`./downloads/${viname}.mp4`)
      .on('progress', p => {

        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Downloading: ${viname} (${p.targetSize}kb)`);

      })
      .on('end', () => {

        console.log(`\nDownload finished in ${(Date.now() - start) / 1000}s`);

      });

  })
}

readlinee.question('Do you wanna download the video to mp3 or mp4 ? (mp3/mp4) ', r => {

  if(r === "mp3") {

    readlinee.question('Video link: ', id => {

      const real = ytdl.validateURL(id)
      if(!real) return console.log("This video doesn't exist.")
      dlvideomp3(ytdl.getURLVideoID(id))
      readlinee.close();

    });

  } else if (r === "mp4") {

    readlinee.question('Video link: ', id => {

      const real = ytdl.validateURL(id)
      if(!real) return console.log("This video doesn't exist.")
      dlvideomp4(ytdl.getURLVideoID(id))
      readlinee.close();

    });

  } else return console.log("Wrong answer.")
  
})