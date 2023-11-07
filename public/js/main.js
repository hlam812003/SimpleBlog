$(function() {
  $('.delete-post').on('click', function(e) {
    e.preventDefault(); 
    
    var postId = $(this).data('post-id');
  
    var confirmation = window.confirm('Are you sure you want to delete this post?');
  
    if (confirmation) {
      $.ajax({
        type: 'POST',
        url: '/posts/' + postId + '/delete',
        success: function(response) {
          if(response.success) {
            $('#post-' + postId).remove();
            window.location = '/';
          } else {
            alert('Error: ' + response.error);
          }
        },        
        error: function() {
          alert('There was an error deleting the post.');
        }
      });
    }
  });  

  $('#comment-form').submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data('post-id');
      var commentText = $('#comment-text').val();
  
      $.ajax({
        type: 'POST',
        url: '/posts/' + postId + '/comments',
        data: { comment: commentText },
        success: function(response) {
          // Thêm bình luận vào danh sách bình luận trên trang
          $('#comments').append('<p>' + response.comment + '</p>');
          // Xóa nội dung trong input
          $('#comment-text').val('');
        }
      });
  });
});
  