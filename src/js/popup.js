((document) => {
    console.log('123',chrome)
    const query = chrome.tabs.query
    const webTiming = document.querySelector('#webTiming')
    const resourceTiming = document.querySelector('#resourceTiming')

    webTiming.addEventListener('click', ()=>{
        sendMessage('webTiming')
    })

    resourceTiming.addEventListener('click', ()=>{
        sendMessage('resourceTiming')
    })


    function sendMessage(action){
        query({
            active:true,
            currentWindow:true
        }, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {
                action:action
            },(res)=>{
                console.log('sendMessage',res)
            })
        })
    }
})(document)