import yeoman from 'yeoman-environment';
import path from 'path';

const env = yeoman.createEnv();

// const tarGenerator = path.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');

//env.register(require.resolve('./generators/app/index.js'), 'npm:index');
//env.register(require.resolve('./generators/app/plugins.index.js'), 'npm:plugins');
// env.register(require.resolve('./generators/app/seed.index.js'), 'npm:seed');
// env.register(require.resolve(tarGenerator), 'npm:react');


//创建React项目
const excute = function (generator: string, commander: string): void {
    const tarGenerator = path.join(__dirname, '../../node_modules', `${generator}/generators/app`, `${commander}.index.js`);
    env.register(require.resolve(tarGenerator), `npm:${commander}`);
    env.run(`npm:${commander}`, { 'skip-install': true }, function (err) {
        console.log('done');
    });
};


export default excute;
	



