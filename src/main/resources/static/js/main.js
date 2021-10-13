function getIndex(list, id){
    for(var i=0; i<list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
};

var studentsApi = Vue.resource('/students{/id}');

Vue.component('student-form',{
    props: ['students','studentAttr'],
    data: function() {
        return {
            name: '',
            surname: '',
            grade: '',
            letter: '',
            id: ''
        }
    },
    watch: {
        studentAttr: function(newVal, oldVal) {
            this.surname = newVal.surname;
            this.name = newVal.name;
            this.grade = newVal.grade;
            this.letter = newVal.letter;
            this.id = newVal.id
        }
    },
    template:
        '<div>'+
            '<input type = "text" placeholder = "Surname" v-model = "surname" />' +
            '<input type = "text" placeholder = "Name" v-model = "name" />' +
            '<input type = "text" placeholder = "Grade" v-model = "grade" />' +
            '<input type = "text" placeholder = "Letter" v-model = "letter" />' +
            '<input type = "button" value = "Save" @click="save" />' +
        '</div>',
    methods: {
        save: function() {
            var student = {
                surname: this.surname,
                name: this.name,
                grade: this.grade,
                letter: this.letter
            };

            if (this.id) {
                studentsApi.update({id: this.id}, student).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.students, data.id);
                        this.students.splice(index, 1, data);
                        this.surname = '';
                        this.name = '';
                        this.grade = '';
                        this.letter = '';
                        this.letter = '';
                        this.id =null;
                    })
                )
            } else {
                studentsApi.save({}, student).then(result =>
                    result.json().then(data => {
                        this.students.push(data);
                        this.surname = '';
                        this.name = '';
                        this.grade = '';
                        this.letter = '';
                    })
                )
            }
        }
    }
});

Vue.component('student-row',{
    props: ['student','editMethod','students'],
    template:
     '<div>'+
        '<i>({{ student.id }})</i> {{ student.surname }} {{ student.name }},'+
        '{{student.grade}}{{student.letter}}' +
            '<span style="position: absolute; right: 0">' +
                '<input type="button" value="Edit" @click="edit" />' +
                '<input type="button" value="Delete" @click="del" />' +
            '</span>' +
     '</div>',
     methods: {
        edit: function() {
            this.editMethod(this.student)
        },
        del: function() {
             studentsApi.delete({id: this.student.id}).then(result =>{
                if (result.ok) {
                    this.students.splice(this.students.indexOf(this.student), 1);
                }
             })
        }
     }
});

Vue.component('students-list', {
  props: ['students'],
  data: function() {
    return {
        student: null
    }
  },
  template:
    '<div>'+
        '<student-form :students="students" :studentAttr="student" />' +
        '<student-row style="position: relative; width: 300px" v-for="student in students" :key = "student.id"'+
         ':student="student" :editMethod="editMethod" :students="students" />'+
    '</div>',
  created: function() {
    studentsApi.get().then(result =>
        result.json().then(data =>
            data.forEach(student => this.students.push(student))
         )
    )
  },
  methods: {
    editMethod: function(student) {
        this.student = student;
    }
  }
});

var app = new Vue({
  el: '#app',
  template: '<students-list :students="students" />',
  data: {
    students:[]
  }
});