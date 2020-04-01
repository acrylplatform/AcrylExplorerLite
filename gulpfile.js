const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
var exec = require('child_process').exec;

const config = {
    package: {
        source: './package.json',
    },
    baseDir: 'src',
    releaseDirectory: 'dist',
};

config.package.data = JSON.parse(fs.readFileSync(config.package.source));

function buildApp(network, done) {
    exec('npm run app:prod --env.network=' + network, function(
        err,
        stdout,
        stderr
    ) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
}

gulp.task('clean', function(done) {
    return del([config.releaseDirectory + '/*', config.releaseDirectory], done);
});

gulp.task('build-mainnet', ['clean'], function(done) {
    buildApp('mainnet', done);
});

gulp.task('build-testnet', ['clean'], function(done) {
    buildApp('testnet', done);
});

gulp.task('build-devnet', ['clean'], function(done) {
    buildApp('devnet', done);
});
