document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.sidenav');

  var options = {  
    edge: 'left',  
    draggable: true,  
    inDuration: 250,  
    outDuration: 200,  
    onOpenStart: function() {  
      console.log('Sidenav opened');  
    },  
    onCloseEnd: function() {  
      console.log('Sidenav closed');  
    }  
  }; 
 var instances = M.Sidenav.init(elems);


  var selectEl = document.querySelectorAll('select');  
  var instances = M.FormSelect.init(selectEl);  

  var checkboxEl = document.querySelectorAll('input[type="checkbox"]');  
  var instances = M.Checkbox.init(checkboxEl); 
  
});



  CKEDITOR.replace('body', {  
    toolbar: [   
      { name: 'clipboard', items: ['PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },   
     
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },  
      
      { name: 'links', items: ['Link', 'Unlink'] },  
      { name: 'insert', items: ['Image'] },  
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },  
      { name: 'colors', items: ['TextColor', 'BGColor'] },  
      

    ]  
  });



