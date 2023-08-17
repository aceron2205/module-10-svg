import inquirer from 'inquirer';
import fs from 'fs';

const generateSVG = ({ color, shape, text }) => {
  let svgContent = '';
  const width = 200;
  const height = 200;
  const centerX = width / 2;
  const centerY = height / 2;

  switch (shape) {
    case 'circle':
      svgContent += `<circle cx="${centerX}" cy="${centerY}" r="80" fill="${color}"/>`;
      break;
    case 'rectangle':
      svgContent += `<rect x="25" y="50" width="150" height="100" fill="${color}"/>`;
      break;
    case 'triangle':
      svgContent += `<polygon points="100,30 190,170 10,170" fill="${color}" />`;
      break;
  }

  svgContent += `<text x="${centerX}" y="${centerY}" alignment-baseline="middle" text-anchor="middle" fill="white" font-family="Arial">${text}</text>`;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
};

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'welcome',
      message: 'Welcome to the Module 10 - SVG Logo Generator! Press ENTER to continue...',
      default: ''
    },
    {
      type: 'list',
      name: 'color',
      message: 'Choose a color for your logo:',
      choices: ['red', 'blue', 'green', 'yellow'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for your logo:',
      choices: ['circle', 'rectangle', 'triangle'],
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text for your logo:',
    },
  ]);

  const svgContent = generateSVG(answers);

  fs.writeFileSync('logo.svg', svgContent, 'utf8');

  console.log('Logo created!! (file saved as logo.svg)');
};

main();
