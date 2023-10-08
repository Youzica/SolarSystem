export const countMixin = {
    data(){
        return {
            count:99
        }
    },
    methods:{
        increment(){
            this.count++
        },
        decrement(){
            this.count--
        }
    }
}