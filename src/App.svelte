<script>
	import { onMount } from "svelte";

	let mode='light',
		rootStyle,
		strokeColor,
		polyColor,
		locationTxt='Kathmandu, Nepal',
		time, 
		formatter,
		options={
			timeZone: 'Asia/Kathmandu',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		},
		projectsData=[
			{
				"title": "Map Chat",
				"link": "https://mapchat.netlify.app",
				"description": "Realtime location based chat website on map. Chat and know where someone is chatting from.",
				"technologies": "SvelteKit, Firebase"
			},
			{
				"title": "Ktm Guessr",
				"link": "https://ktmguessr.netlify.app",
				"description": "Guess different places of Kathmandu based on the 360 view image. The closer you guess, the more points you get.",
				"technologies": "SvelteKit, Firebase"
			},
			{
				"title": "CG ko Malik",
				"link": "https://cgkomalik.netlify.app",
				"description": "Fun billionaire simulator website. Shop like Nepal's only billionaire, Binod Chaudhary.",
				"technologies": "SvelteJs, HTML2Canvas"
			},
			{
				"title": "Liquors Nepal",
				"link": "https://github.com/rubekk/Liquors-Nepal",
				"description": "An ecommerce website to sell liquor products",
				"technologies": "PHP"
			},
			{
				"title": "Envision Travel",
				"link": "https://envisiontravel.netlify.app",
				"description": "A single page travel agency website. Elegant and responsive.",
				"technologies": "HTML/CSS, JavaScript"
			},
			{
				"title": "Bipana Ko Ghar",
				"link": "https://github.com/rubekk/Bipana-ko-Ghar",
				"description": "Real Estate e-commerce website using PHP",
				"technologies": "PHP"
			},
			{
				"title": "Districts of Nepal",
				"link": "https://districtsofnepal.netlify.app",
				"description": "Fun web based game to guess the districts of Nepal either by clicking on the map or typing. Try getting the highest score.",
				"technologies": "Sveltekit, Firebase"
			}
		];
	setInterval(()=>getTime(), 1000);

	const getTime=()=>{
		formatter = new Intl.DateTimeFormat([], options);

		time=formatter.format(new Date());
	}
	const handleMode=()=>{
		mode=mode=='light'?'dark':'light';

		handleColors();
	}
	const handleColors=()=>{
		if(mode=='light'){
			document.querySelector("body").style.backgroundColor="#fff";
			rootStyle.style.setProperty("--dark","rgb(46,46,46)");
			rootStyle.style.setProperty("--medium","rgb(54,54,54)");
			rootStyle.style.setProperty("--light","rgb(90,90,90)");
			rootStyle.style.setProperty("--txtColor","rgb(0,0,0)");
		}
		else{
			document.querySelector("body").style.backgroundColor="rgb(41, 41, 41)";
			rootStyle.style.setProperty("--dark","rgb(219,219,219)");
			rootStyle.style.setProperty("--medium","rgb(211,211,211)");
			rootStyle.style.setProperty("--light","rgb(175,175,175)");
			rootStyle.style.setProperty("--txtColor","rgb(255,255,255)");
		}
		rootStyle.style.setProperty("--borderColor", "purple");
	}
	const handleSize=()=>{
		locationTxt=window.innerWidth<525?'Ktm, NP':'Kathmandu, Nepal';
	}
	getTime();

	onMount(async ()=>{
		rootStyle=document.querySelector(":root");

		handleColors();
	})

	$: {
		strokeColor=mode=='light'?'black':'white';
		polyColor=mode=='light'?'#f5f0f0':'#1f1d1d';
	}
</script>

<svelte:window on:load={handleSize} on:resize={handleSize}></svelte:window>

<div class="main">
	<div class="time-location-brightness-sec">
		<div class="time-location">
			<div class="time">{time}</div>
			<div class="location">{locationTxt}</div>
		</div>
		<div class="brightness">
			<i class={`fa-solid fa-${mode=='light'?'moon':'sun'}`} on:click={handleMode}></i>
		</div>
		<div class="svg">
			<svg width="200" height="9" viewBox="0 0 301 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_4_13)">
				<line x1="4" y1="4.75" x2="297" y2="4.75" stroke={strokeColor} stroke-width="0.5"/>
				</g>
				<defs>
				<filter id="filter0_f_4_13" x="0" y="0.5" width="301" height="8.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
				<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_4_13"/>
				</filter>
				</defs>
			</svg>	
		</div>	
	</div>

	<div class="name-about-sec">
		<div class="name title">Rubek Maharjan</div>
		<div class="what">FrontEnd Developer / JavaScript Enthusiast</div>
		<div class="more">I am a frontend developer and computer science student based on Kathmandu. I enjoy thinking about creative ideas or projects. Once I have an idea, I like to bring it to life through code.</div>

		<div class="contact">
			<li><a href="mailto:rubekmhzn7@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a></li>
			<li><a href="https://linkedin.com/in/rubekk" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
			<li><a href="https://github.com/rubekk" target="_blank"><i class="fa-brands fa-square-github"></i></a></li>
		</div>

		<div class="svg">
			<svg width="200" height="9" viewBox="0 0 301 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_4_13)">
				<line x1="4" y1="4.75" x2="297" y2="4.75" stroke={strokeColor} stroke-width="0.5"/>
				</g>
				<defs>
				<filter id="filter0_f_4_13" x="0" y="0.5" width="301" height="8.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
				<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_4_13"/>
				</filter>
				</defs>
			</svg>	
		</div>
	</div>

	<div class="skills-sec">
		<div class="title">Skills</div>
		<div class="skills">
			<li>HTML/CSS</li>
			<li>JavaScript</li>
			<li>Tailwind CSS</li>
			<li>SvelteKit</li>
			<li>Firebase</li>
			<li>MySQL</li>
			<li>NodeJs</li>
			<li>PHP</li>
			<li>GIT</li>
		</div>
		<div class="svg">
			<svg width="200" height="9" viewBox="0 0 301 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_4_13)">
				<line x1="4" y1="4.75" x2="297" y2="4.75" stroke={strokeColor} stroke-width="0.5"/>
				</g>
				<defs>
				<filter id="filter0_f_4_13" x="0" y="0.5" width="301" height="8.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
				<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_4_13"/>
				</filter>
				</defs>
			</svg>	
		</div>
	</div>
	
	<div class="projects-sec">
		<div class="title">Projects</div>
		<div class="projects">
			{#each projectsData as project, i}
				<div class="project">
					<div class="project-name">
						{i+1}. <a class="underline" href={project.link} target="_blank">{project.title}</a>
						<a href={project.link}><i class="fa-solid fa-link"></i></a>
					</div>
					<div class="project-description">{project.description}</div>
					<div class="project-technologies">Technologies: <span class="technology">{project.technologies}</span></div>
				</div>
			{/each}
		</div>
		
		<div class="svg">
			<svg width="200" height="9" viewBox="0 0 301 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_4_13)">
				<line x1="4" y1="4.75" x2="297" y2="4.75" stroke={strokeColor} stroke-width="0.5"/>
				</g>
				<defs>
				<filter id="filter0_f_4_13" x="0" y="0.5" width="301" height="8.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
				<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_4_13"/>
				</filter>
				</defs>
			</svg>	
		</div>
	</div>
	
	<div class="contact-sec">
		<div class="contact">
			<li><a href="mailto:rubekmhzn7@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a></li>
			<li><a href="https://linkedin.com/in/rubekk" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
			<li><a href="https://github.com/rubekk" target="_blank"><i class="fa-brands fa-square-github"></i></a></li>
		</div>
	</div>

	<div class="poly-1">
		<svg width="100" height="200" viewBox="0 0 187 303" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M186.8 169.395L21.1 302.243L186.8 169.395L21.1 302.243L0 0L186.8 169.395Z" fill={polyColor}/>
		</svg>
	</div>
	<div class="poly-2">
		<svg width="100" height="200" viewBox="0 0 187 303" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M186.8 169.395L21.1 302.243L186.8 169.395L21.1 302.243L0 0L186.8 169.395Z" fill={polyColor}/>
		</svg>
	</div>
</div>

<style>
	.main{
		padding: 0 1rem;
		margin: 4rem auto;
		width: 700px;
		color: var(--txtColor);
		position: relative;
		transition: .3s;
	}
	/* flex align-center */
	.time-location-brightness-sec, .time-location, .skills, .blogs-contact-sec, .contact{
		display: flex;
		align-items: center;
	}
	/* margin bottom 5rem */
	.time-location-brightness-sec, .name-about-sec, .name, .skills-sec, .projects-sec{
		margin-bottom: 5rem;
	}
	/* position relative */
	.time-location-brightness-sec, .name-about-sec, .projects-sec, .skills-sec{
		position: relative;
	}
	.time-location-brightness-sec{
		justify-content: space-between;
	}
	.time-location{
		color: var(--light);
	}
	.time{
		min-width: 95px;
	}
	.brightness i{
		font-size: 1.5rem;
		cursor: pointer;
	}
	.svg{
		position: absolute;
		bottom: -3rem;
		width: 100%;
	}
	.title{
		margin-bottom: 1.5rem;
		color:var(--dark);
		font-size: 1.75rem;
		font-family: 'Yeseva One', cursive;
		font-weight: bold;
	}
	.name{
		margin-bottom: .75rem;
	}
	.what{
		margin-bottom: .5rem;
		color: var(--light);
	}
	.more{
		color:var(--medium);
	}
	.name-about-sec .contact{
		margin-top: 2rem;
	}
	.skills{
		flex-wrap: wrap;
		row-gap: .5rem;
		column-gap: .75rem;
	}
	.skills li{
		padding: .25rem .5rem;
		border: 1px solid var(--borderColor);
		border-radius: 3px;
		cursor: crosshair;
	}
	.project{
		margin-bottom: 2.25rem;
	}
	.project-name{
		margin-bottom: .75rem;
		width: max-content;
		font-size: 1.25rem;
	}
	.project-name a{
		color:var(--dark);
	}
	.project-name i{
		margin-left: 1rem;
		color: #797979;
		transition: .3s;
	}
	.project-name i:hover{
		color: #000;
	}
	.underline{
		border-bottom: 2px solid var(--borderColor);
	}
	.underline:hover{
		border-width: 3px;
	}
	.project-description{
		margin-bottom: .5rem;
		color: var(--medium);
	}
	.project-technologies{
		color: var(--light);
	}
	.technology{
		font-weight: bold;
		font-style: italic;
	}
	.location{
		margin-left: 3rem;
	}
	.contact-sec{
		justify-content: space-between;
	}
	.contact li{
		margin: .5rem;
		font-size: 1.5rem;
	}
	.contact li i, .brightness i{
		color:var(--dark);
	}
	.contact li i:hover, .brightness i:hover{
		color:var(--light);
	}
	.poly-1{
		position: absolute;
		left: -15rem;
		top: 10rem;;
	}
	.poly-2{
		position: absolute;
		right: -15rem;
		bottom: 10rem;
		transform: rotate(-180deg);
	}

	/* media queries */
	@media(max-width: 725px){
		.main{
			width: 650px;
		}
	}
	@media(max-width: 675px){
		.main{
			width: 600px;
		}
	}
	@media(max-width: 625px){
		.main{
			width: 550px;
		}
	}
	@media(max-width: 575px){
		.main{
			width: 500px;
		}
	}
	@media(max-width: 525px){
		.main{
			width: 450px;
		}
		.location{
			margin-left: 2rem;
		}
	}
	@media(max-width: 475px){
		.main{
			width: 400px;
		}
		.right{
			margin-top: 1rem;
			margin-left: 0 !important;
		}
	}
	@media(max-width: 425px){
		.main{
			width: 350px;
		}
		.location{
			margin-left: 1rem;
		}
	}
	@media(max-width: 375px){
		.main{
			width: 300px;
		}
	}
</style>
