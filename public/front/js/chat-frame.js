fetch('https://payment.secure-terminal.com/feedback')
// fetch('http://localhost:8000/feedback')
	.then(r => r.text())
	.then(data => {
		const iFrame = document.createElement('iframe')

		document.getElementById('main').appendChild(iFrame)
		
		iFrame.setAttribute('style', "height:530px;width:340px;position:fixed;left:0;bottom:0;border: none;")

		iFrame.contentWindow.document.open()
		iFrame.contentWindow.document.write(data)
		iFrame.contentWindow.document.close()
		window.document.addEventListener('cieloChatDimensions', handleEvent, false)
		function handleEvent(e) {
			if(e.detail.chatOpen===false){
				iFrame.style.height = e.detail.btnHeight+'px'
				iFrame.style.width = e.detail.btnWidth+'px'
			}else{
				iFrame.style.height = e.detail.height+'px'
				iFrame.style.width = e.detail.width+'px'
			}
		}
	})
	.catch(e => console.log('error', e))