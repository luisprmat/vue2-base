var EventBus = new Vue;

Vue.component('app-icon', {
    template: '<i :class="cssClasses"></i>', 
    props: ['img'],
    computed: {
        cssClasses() {
            var css;
            switch (this.img) {
                case 'edit':
                    css = 'fas fa-edit';
                    break;
                case 'trash':
                    css = 'fas fa-trash-alt';
                    break;
                case 'ok':
                    css = 'fas fa-check';
                    break;
                case 'remove':
                    css = 'fas fa-times';
                    break;
                case 'unchecked':
                    css = 'far fa-square';
                    break;
                case 'check':
                    css = 'far fa-check-square';
                    break;
                default:
                    css = '';
                    break;
            }
            return css + ' fa-fw';
        }
    }
});

Vue.component('app-task', {
    data() {
        return {
            editing: false,
            draft: '',
        };
    },
    template: '#task-template',
    props: ['task', 'index'],
    created() {
        EventBus.$on('editing', function (index) {
            if (this.index != index) {
                this.discard();
            }
        }.bind(this));
    },
    methods: {
        toggleStatus() {
            this.task.pending = !this.task.pending;
        },
        edit() {
            EventBus.$emit('editing', this.index);

            this.draft = this.task.description;

            this.editing = true;
        },
        update() {
            this.task.description = this.draft;

            this.editing = false;
        },
        discard() {
            this.editing = false;
        },
        remove() {
            this.$emit('remove', this.index);
        },
    }
});

var vm = new Vue({
    el: '#app', 
    data: {
        name: 'Luis Parrado',
        new_task: '',
        tasks: [
            {
                description: 'Aprender Vue.js',
                pending: true,
            },
            {
                description: 'Suscribirse en Styde',
                pending: true,
            }, 
            {
                description: 'Grabar lección de Vue',
                pending: false,
            }  
        ]
    },
    methods: {
        createTask() {
            this.tasks.push({
                description: this.new_task,
                pending: true,
                editing: false
            });

            this.new_task = '';
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
        },
        deleteCompleted() {
            this.tasks = this.tasks.filter(function (task) {
                return task.pending;
            });
        }
    }
});
