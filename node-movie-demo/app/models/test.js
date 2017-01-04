var Movie=require('./movie');
Movie.findById('586a5335817f653674906f01',function (err,movie) {
	console.log(movie);
})