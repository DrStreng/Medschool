app.controller('NotesCtrl', function($scope,$http,$routeParams,$location) {

var hide = function(){
        quill.enable(false)
        $('.ql-toolbar').hide();
        $('#form_edit').hide();
        $('#edit').show();
        $('#save').hide();
        $('#details').show();
        $('#editor').css({"border-top": "1px solid #ccc"});
        quill.setContents($scope.note.content)
}



    $scope.title = {
        title : "Notatki",
        glyph : 'book'
    } 
    $scope.search = {};

    //NAW
    $scope.newNote = function(){
            var id = $routeParams.id;
            return '#!/Person/notes/newNote/'+id;
    }
    $scope.backToNotes = function(){
            var id = $routeParams.id;
            return '#!/Person/notes/'+id;
    }
    $scope.detailsNote = function(note){
         var idUser = $routeParams.id;
         return '#!/Person/notes/details/'+idUser+'/'+note._id;
    }



    //getNotes
    $scope.getNotes = function(){
        $http.get('/note/getByStudent/'+$routeParams.id).then(function(res){
            $scope.listNotes = res.data; 
        }); 
    }

    //saveNote
    $scope.saveEditor = function(valid){

        window.delta = quill.getContents();
        $scope.text = delta;
        var note = {
            title: $scope.note.title,
            content : delta,
            student : $routeParams.id,
            details : $scope.note.description
        }
            $http.post('/note/add',note).then(function(res){
                var id = $routeParams.id;
                $location.path('/Person/notes/'+id)
            }); 
    }

    $scope.getNoteById = function(){
        var idNote = $routeParams.idNote;
        $http.get('/note/get/'+idNote).then(function(res){
            $scope.note = res.data; 
            hide();
        }); 
    }
    $scope.startEdit = function(){
        $scope.form = jQuery.extend({}, $scope.note);
        $('.ql-toolbar').show();$('#details').hide();$('#form_edit').show();
        $('#edit').hide();
        $('#save').show();
        $('#editor').css({"border-top": "0px"})
        quill.enable(true)
    }
    $scope.closeEdit = function(){
        hide();
    }
    $scope.saveEditEditor = function(isValid){
        $scope.form.content = quill.getContents();
        $http.post('/note/edit',$scope.form).then(function(res){
            $scope.getNoteById();
        }); 
    }
    $scope.deleteNote = function(){
        var id = {_id :$routeParams.idNote }
        $http.post('/note/remove',id).then(function(res){
            $location.path('/Person/notes/'+$routeParams.idUser)
        }); 
    }

});