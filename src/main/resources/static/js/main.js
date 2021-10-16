function getIndex(list, id){
    for(var i=0; i<list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
};

var studentsApi = Vue.resource('/students{/id}');
var eventsApi = Vue.resource('/events{/id}');
var eventMembersApi = Vue.resource('/events{/id}/students{/student_id}');
var eventDownloadApi = Vue.resource('/events{/id}/{name}.csv');

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
        '<student-row style="position: relative; width: 500px" v-for="student in students" :key = "student.id"'+
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

Vue.component('students-management',{
    props: ['event','students'],
    data: function() {
        return {
            participants: [],
            others: [],
        }
    },
    template:
        '<div>'+
            '<h5>Other students</h5>'+
            '<div v-for="other in others">' +
                '<div> {{other.name}} {{other.surname}}' +
                    '<span style="position: absolute; right: 0">' +
                        '<input type="button" value="Add" @click="add(other)" />' +
                    '</span>' +
                '</div>'+
            '</div>'+
            '<h5>Participants</h5>'+
            '<div v-for="participant in participants">' +
                '<div>{{participant.name}} {{participant.surname}}'+
                    '<span style="position: absolute; right: 0">' +
                        '<input type="button" value="Remove" @click="remove(participant)" />' +
                    '</span>' +
                '</div>' +
            '</div>'+
        '</div>',
    created: function() {
        this.update();
    },
    methods: {
      add: function(other) {
          eventMembersApi.save({id: this.event.id}, other).then(result => this.update());
      },
      remove: function(participant) {
          eventMembersApi.delete({id: this.event.id, student_id: participant.id}).then(result => this.update());
      },
      update: function() {
          eventMembersApi.get({id: this.event.id}).then(result =>
              result.json().then(data => {
                this.others = this.students.slice();
                this.participants = [];
                data.forEach(student => {
                    this.participants.push(student);
                    var index = getIndex(this.others, student.id);
                    this.others.splice(index, 1);
                })
              })
          )
      }
    }
})

Vue.component('event-form',{
    props: ['events'],
    data: function() {
        return {
            name: '',
            id: ''
        }
    },
    template:
        '<div>'+
            '<input type = "text" placeholder = "Event name" v-model = "name" />' +
            '<input type = "button" value = "Save" @click="save" />' +
        '</div>',
    methods: {
        save: function() {
            var event = {
                name: this.name
            };
            eventsApi.save({}, event).then(result =>
                result.json().then(data => {
                    this.events.push(data);
                    this.name = '';
                })
            )
        }
    }
});

Vue.component('event-row',{
    props: ['event','events','students'],
      data: function() {
        return {
            show: false
        }
      },
    template:
     '<div>'+
        '<i>({{ event.id }})</i>{{ event.name }}'+
            '<span style="position: absolute; right: 0">' +
                '<input type="button" value="Delete" @click="del" />' +
                '<input type="button" value="Edit students" @click="switchShow" />' +
                '<a v-bind:href="`/events/${event.id}/${event.name}.csv`" type="button">Download</a>'+
            '</span>' +
             '<students-management v-if = "show" :event="event" :students="students"/>' +
     '</div>',
     methods: {
        del: function() {
             eventsApi.delete({id: this.event.id}).then(result =>{
                if (result.ok) {
                    this.events.splice(this.events.indexOf(this.event), 1);
                }
             })
        },
        switchShow: function() {
            this.show = !this.show;
        }
     }
});

Vue.component('events-list', {
  props: ['events','students'],
  template:
    '<div>'+
        '<event-form :events="events"/>' +
        '<event-row style="position: relative; width: 500px" v-for="event in events" :key = "event.id"'+
         ':event="event" :events="events" :students="students"/>'+
    '</div>',
  created: function() {
    eventsApi.get().then(result =>
        result.json().then(data =>
            data.forEach(event => this.events.push(event))
         )
    )
  }
});

Vue.component('main-view',{
    props: ['events','students'],
    template:
        '<div>'+
            '<students-list :students="students" />'+
            '<events-list :events="events" :students="students"/>'+
        '</div>',
});

var app = new Vue({
  el: '#app',
  template: '<main-view :students="students" :events="events" />',
  data: {
    students:[],
    events:[],
  }
});