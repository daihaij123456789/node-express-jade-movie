$(function() {
  var delMovie='.del';
  var delUser='.deluser';
  var delCat='.delcat';
  var urlMovie='../movie/list?id=';
  var urlUser='../user/list?id=';
  var urlCat='../category/list?id=';
  function delUrl(delStr,urlStr) {
      $(delStr).click(function(e) {
      var target = $(e.target)
      var id = target.data('id')
      var tr = $('.item-id-' + id)

      $.ajax({
        type: 'DELETE',
        url: urlStr + id
      })
      .done(function(results) {
        if (results.success === 1) {
          if (tr.length > 0) {
            tr.remove()
          }
        }
      })
    })
  }

  delUrl(delMovie, urlMovie);
  delUrl(delUser, urlUser);
  delUrl(delCat, urlCat);
  /*//删除电影列表
  $('.del').click(function(e) {
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-' + id)

    $.ajax({
      type: 'DELETE',
      url: '../movie/list?id=' + id
    })
    .done(function(results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove()
        }
      }
    })
  })
//删除用户列表
  $('.deluser').click(function(e) {
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-' + id)

    $.ajax({
      type: 'DELETE',
      url: '../user/list?id=' + id
    })
    .done(function(results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove()
        }
      }
    })
  })
//删除分类列表
  $('.delcat').click(function(e) {
      var target = $(e.target)
      var id = target.data('id')
      var tr = $('.item-id-' + id)

      $.ajax({
        type: 'DELETE',
        url: '../category/list?id=' + id
      })
      .done(function(results) {
        if (results.success === 1) {
          if (tr.length > 0) {
            tr.remove()
          }
        }
      })
    })*/


  $('#douban').blur(function() {
    var douban = $(this)
    var id = douban.val()

    if (id) {
      $.ajax({
        url: 'https://api.douban.com/v2/movie/subject/' + id,
        cache: true,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: function(data) {
          $('#inputTitle').val(data.title)
          $('#inputDoctor').val(data.directors[0].name)
          $('#inputCountry').val(data.countries[0])
          $('#inputPoster').val(data.images.medium)
          $('#inputYear').val(data.year)
          $('#inputSummary').val(data.summary)
        }
      })
    }
  })
})



