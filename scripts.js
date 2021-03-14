// nutta.site


// Mobile nav menu toggle
function menuToggle(selector) {
	if (document.querySelector(selector)) {
		let tgl = document.querySelector(selector)
		tgl.addEventListener('click', function() {
			document.body.classList.toggle('nav-active')
		
		})
	}
}

menuToggle('.mobile-nav-toggle')

// Draggable
function draggable(selector) {
	if (document.querySelector(selector)) {
		let dragItems = document.querySelectorAll(selector)
		for (let i = 0; i < dragItems.length; i++) drag(dragItems[i]);
		function drag(el) {
			let dragItem = el
			let body = document.body
			let active = false
			let currentX
			let currentY
			let initialX
			let initialY
			let highestZ = 1
			let newZ = dragItem.style.zIndex || 1
			let xOffset = 0
			let yOffset = 0

			body.addEventListener('touchstart', dragStart, false)
			body.addEventListener('touchend', dragEnd, false)
			body.addEventListener('touchmove', drag, false)
			body.addEventListener('mousedown', dragStart, false)
			body.addEventListener('mouseup', dragEnd, false)
			body.addEventListener('mousemove', drag, false)

			function dragStart(e) {
				if (e.type === 'touchstart') {
					initialX = e.touches[0].clientX - xOffset
					initialY = e.touches[0].clientY - yOffset
				} else {
					initialX = e.clientX - xOffset
					initialY = e.clientY - yOffset
				}
				if (e.target === dragItem) {
					active = true
					dragItem.style.cursor = 'grabbing'
					newZ = makeHighestZ()
					let initZ = parseInt(dragItem.style.zIndex)
					if (newZ > initZ) {
						dragItem.style.zIndex = newZ
					} 
				}			
			}

			function makeHighestZ() {	
				let initZ = parseInt(dragItem.style.zIndex)
				for (let i = 0; i < dragItems.length; i++) {
					if (!dragItems[i].style.zIndex) {
						dragItems[i].style.zIndex = 1
					}
					if (parseInt(dragItems[i].style.zIndex) > highestZ) {
						highestZ = parseInt(dragItems[i].style.zIndex)
					} else {
						highestZ = highestZ
					}
				}
				if (initZ >= highestZ) {
					return initZ
				} else {
					return ++highestZ
				}
			}

			function dragEnd(e) {
				initialX = currentX
				initialY = currentY
				active = false
				dragItem.style.cursor = 'grab'
			}

			function drag(e) {
				if (active) {
					e.preventDefault();
					if (e.type === 'touchmove') {
						currentX = e.touches[0].clientX - initialX
						currentY = e.touches[0].clientY - initialY
					} else {
						currentX = e.clientX - initialX
						currentY = e.clientY - initialY
					}
					xOffset = currentX
					yOffset = currentY
					setTranslate(currentX, currentY, dragItem)
				}
			}

			function setTranslate(xPos, yPos, el) {
				el.style.transform = 'translate(' + xPos + 'px, ' + yPos + 'px)'
			}
		}
		function resetAllItems(e) {		
			e.preventDefault()
			for (let i = 0; i < dragItems.length; i++) {
				dragItems[i].style.transition = 'transform 1s'
				dragItems[i].style.transform = 'translate(0px,0px)'
				setTimeout(function() {
					dragItems[i].style.transition = ''
				}, 1000)			
			}
			draggable(selector)
		}
		if (document.querySelector('.reset')) {
			document.querySelector('.reset').addEventListener('click', resetAllItems)
		}
	}
}

draggable('.drag')

