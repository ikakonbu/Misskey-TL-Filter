
	    

self.addEventListener('message',(e) => {
    var emojiDB;
    
    fetch("https://" + e.data + "/api/emojis", {priority: 'low'})
    .then((res) => {
        emojiDB = res.json()
            .then((res) => {

                const result = {};
                result.emojis = res.emojis.map(obj => {
                    const { category, ...rest } = obj;
                    return rest;
                });
                  
                  

                self.postMessage(result); 
            });
    });
  }, false);