"use strict"

window.onload = function(){
	let mainTitle = document.querySelector(".parallax__content").classList.add("ready")

	//parallax
	const parallax = document.querySelector(".parallax")
	
	if(parallax){
		const Content = document.querySelector(".parallax__content")
		const Mountains = document.querySelector(".images-parallax__mountains")
		const Clouds = document.querySelector(".images-parallax__clouds")
		const Human = document.querySelector(".images-parallax__human")
		

		const forClouds = 30;
		const forMountain = 20;
		const forHuman = 10;

		const Speed = 0.05;


		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;


		function setMouseParallaxStyle(){
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * Speed);
			positionY = positionY + (distY * Speed)

			// console.log(positionY/forClouds)
			

			Clouds.style.cssText = `transform: translate(${positionX/forClouds}%, ${positionY/forClouds}%);`;
			Mountains.style.cssText = `transform: translate(${positionX/forMountain}%, ${positionY/forMountain}%);`;
			Human.style.cssText = `transform: translate(${positionX/forHuman}%, ${positionY/forHuman}%);`;
			
			requestAnimationFrame(setMouseParallaxStyle);
		}	
		setMouseParallaxStyle();

		parallax.addEventListener('mousemove', function(e){
			const parallaxWidht = parallax.offsetWidth;
			const parallaxHeigh = parallax.offsetHeight;

			const coordX = e.pageX - parallaxWidht / 2;
			const coordY = e.pageY - parallaxHeigh / 2;

			coordXprocent = coordX / parallaxWidht * 100;
			coordYprocent = coordY / parallaxHeigh * 100;
			
		});


			//scrol parallax
		let thresholdSets = [];
		for(let i =0; i<=1.0; i+= 0.005){
			thresholdSets.push(i);
		}

		const callback = function (entries, observer){
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight *100;
			setParallaxItemStyle(scrollTopProcent);
		}

		const observer = new IntersectionObserver(callback,{
			threshold: thresholdSets
		})

		observer.observe(document.querySelector('.page'));

		function setParallaxItemStyle(scrollTopProcent){
			Content.style.cssText = `transform: translate(0%, -${scrollTopProcent*2}%);`;
			// Content.style.cssText = `opacity: ${1-scrollTopProcent/100};`;
			Human.style.cssText = `transform: translate(0%, -${scrollTopProcent}%);`;
			Mountains.style.cssText = `transform: translate(0%, -${scrollTopProcent}%);`;
			
		}

	}
	
	
	////scroll anim card

	

	let elements = document.querySelectorAll(".card-content");
	let images = document.querySelectorAll(".card__image")
    // Intersection observer
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
				entry.target.style.opacity = "1";
				entry.target.style.transform = "translate(0%,0%)";
            } 
        });
    });

    elements.forEach((el) => {
        observer.observe(el);
    });
	images.forEach((el) => {
        observer.observe(el);
    });





}