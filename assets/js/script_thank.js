getLinkBlog();

function getLinkBlog() {
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

fetch("https://papaya.com.pe/api-blog/blog/byVistas", requestOptions)
  .then(response => response.json())
  .then(result => {
  	const listPost = result;  	
  	let _html = ''
  	listPost.map(post => {
  		const _fecha = new Date(post.fecha).toLocaleDateString()
  		_html += `<div class="post-preview">
			    <div class="post-media-body">
			        <!-- svelte-ignore a11y-click-events-have-key-events -->
			        <img src="${post.link_foto_principal}" alt=${post.link_foto_principal} onclick="goPost('${post.link_id}')">            
			    </div>
			    <div class="post-content-body">
			        <!-- svelte-ignore a11y-click-events-have-key-events -->
			        <p class="title m-0" onclick="goPost('${post.link_id}')">${post.titulo}</p>
			        <p class="text-secondary m-0 fs-12">${post.resumen}</p>
			    </div>
			    <div class="post-meta">
			        <div class="d-flex">			            
			            <p class="fs-11"><i class="fa fa-calendar-times-o"></i> ${_fecha}</p>
			        </div>
			        <div>
			            <p class="fs-11"><i class="fa fa-eye"></i> ${post.vistas}</p>
			        </div>
			    </div>
			</div>`
  	})

  	$('#content-post').html(_html).trigger('create')
  })
  .catch(error => console.log('error', error));
}

function goPost(link) {
	const _url = `https://blog.papaya.com.pe/blog/${link}`;	
	window.open(_url, "_blank");
}