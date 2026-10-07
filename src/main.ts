import { mount } from 'svelte';
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/base.css';
import App from './App.svelte';

mount(App, { target: document.body });
