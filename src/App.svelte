<script>
	import { onMount } from "svelte";

	let mode='light',
		rootStyle,
		strokeColor,
		polyColor,
		locationTxt='Kathmandu, Nepal',
		displayMsg=false,
		time, 
		formatter,
		options={
			timeZone: 'Asia/Kathmandu',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		};

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
	const handleDisplayMsg=()=>{
		displayMsg=true;

		setTimeout(()=>displayMsg=false, 2500);
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
			<div class="project">
				<div class="project-name product-hunt-sec">
					<div class="left">
						1. <a class="underline" href="https://todopomo.netlify.app" target="_blank">TodoPomo</a>
					</div>
					<div class="right">
						{#if mode=='light'}
						<a href="https://www.producthunt.com/posts/todopomo?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-todopomo" target="_blank"><img class="product-hunt-img" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=334883&theme=light" alt="TodoPomo - Todo&#0032;list&#0032;with&#0032;Pomodoro&#0032;technique | Product Hunt" style="width: 250px; height: 54px;"/></a>
						{:else}
						<a href="https://www.producthunt.com/posts/todopomo?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-todopomo" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=334883&theme=dark" alt="TodoPomo - Todo&#0032;list&#0032;with&#0032;Pomodoro&#0032;technique | Product Hunt" style="width: 250px; height: 54px; border: 1px solid #fff; border-radius: 15px;"/></a>
						{/if}
					</div>
				</div>
				<div class="project-description">Todo list plus pomodoro timer app with music section. Work without any interruptions and take breaks in between to relax.</div>
				<div class="project-technologies">Technologies: <span class="technology">HTML/CSS, JavaScript</span></div>
			</div>
			<div class="project">
				<div class="project-name">2. <a class="underline" href="https://districtsofnepal.netlify.app" target="_blank">Districts of Nepal</a></div>
				<div class="project-description">Fun web based game to guess the districts of Nepal either by clicking on the map or typing. Try getting the highest score.</div>
				<div class="project-technologies">Technologies: <span class="technology">SvelteKit, Firebase</span></div>
			</div>
			<div class="project">
				<div class="project-name">3. <a class="underline" href="https://cgkomalik.netlify.app" target="_blank">CGkoMalik</a></div>
				<div class="project-description">Fun billionaire simulator website. Shop like Nepal's only billionaire, Binod Chaudhary.</div>
				<div class="project-technologies">Technologies: <span class="technology">SvelteJs, HTML2Canvas</span></div>
			</div>
			<div class="project">
				<div class="project-name">4. <a class="underline" href="https://whichcolor.netlify.app" target="_blank">WhichColor?</a></div>
				<div class="project-description">Extract colors from an image. Responsive and visually appealing website.</div>
				<div class="project-technologies">Technologies: <span class="technology">HTML/CSS, JavaScript, Colorthief JS</span></div>
			</div>
			<div class="project">
				<div class="project-name">5. <a class="underline" href="https://instantcharts.netlify.app" target="_blank">Instant Charts</a></div>
				<div class="project-description">Create different kinds of charts for various purposes. Instant chart creator.</div>
				<div class="project-technologies">Technologies: <span class="technology">SvelteJs, HTML2Canvas</span></div>
			</div>
			<div class="project">
				<div class="project-name">6. <a class="underline" href="https://envisiontravel.netlify.app" target="_blank">Envision Travel</a></div>
				<div class="project-description">A single page travel agency website. Elegant and responsive.</div>
				<div class="project-technologies">Technologies: <span class="technology">HTML/CSS, JavaScript</span></div>
			</div>
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
	<div class="blogs-contact-sec">
		<div class="blogs underline" on:click={handleDisplayMsg}>/blogs</div>
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
	{#if displayMsg}
	<div class="msg">
		<p>The page is not ready yet. Come back soon.</p>
	</div>
	{/if}
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
	.product-hunt-sec{
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.product-hunt-sec .right{
		margin-left: 2rem;
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
	.location, .contact{
		margin-left: 3rem;
	}
	.blogs-contact-sec{
		justify-content: space-between;
	}
	.blogs{
		font-size: 1.25rem;
		cursor: pointer;
	}
	.blogs:hover{
		border-width: 3px;
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
	.msg{
		width: max-content;
		padding: .25rem 1rem;
		position: absolute;
		bottom: 0;
		left: 50%;
		right: 50%;
		transform: translateX(-50%);
		font-style: italic;
		border: 1px solid var(--borderColor);
		background: #fff;
		color: #000;
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
		.product-hunt-sec{
			align-items: flex-start;
			justify-content: left;
			flex-direction: column;
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
