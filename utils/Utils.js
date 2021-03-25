module.exports = async (client) => {
  client.utils = {}
  
  client.utils.formatBytes = bytes => {
		  if (bytes === 0) return '0 Bytes';
		  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		  const i = Math.floor(Math.log(bytes) / Math.log(1024));
		  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	  }

    client.utils.time = s => {
		  function pad(n, z) {
			  z = z || 2;
			  return ('00' + n).slice(-z);
		  }
		  let ms = s % 1000;
		  s = (s - ms) / 1000;
		  let secs = s % 60;
		  s = (s - secs) / 60;
		  let mins = s % 60;
		  let hrs = (s - mins) / 60;
	
		  let days = parseInt(Math.floor(hrs / 24));
		  hrs = parseInt(hrs % 24);
		
		  let meses = parseInt(Math.floor(days / 30));
		  days = parseInt(days % 30);
		
		  return (meses > 0 ? pad(meses) + 'm, ' : "") + (days > 0 ? pad(days) + 'd, ' : "") + (hrs > 0 ? pad(hrs) + 'h, ' : "") + (mins > 0 ? pad(mins) + 'm ' : "") + (pad(secs) + 's')
	  }

    client.utils.capitalise = string => {
      //modifiquei pra ficar mais otimizado (davi)
		  return string.slice(0,1).toUpperCase() + string.slice(1)
	  }

    client.utils.formatArray = (array, type = 'conjunction') => {
		  return new Intl.ListFormat('pt-br', { style: 'short', type: type }).format(array);
  }

}