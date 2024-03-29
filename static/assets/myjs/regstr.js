let app = new Vue({
  el: "#reg",
  delimiters: ["{", "}"],
   data: {
       nisinvalid:false,
       sisinvalid:false,
       bisinvalid:false,
       sisinvalid:false,
       shisinvalid:false,
       pisinvalid:false,
       ndisinvalid:false,
       bdisinvalid:false,
       eisinvalid:false,
       cisinvalid:false,
       cheisinvalid:false,
       che2isinvalid:false,
       tcisinvalid:false,
       name:null,
       check:false,
       check2:false,
       surname:null,
       bdate:null,
       sex:0,
       shrt:0,
       phone:null,
       code:null,
       email:null,
       d_name:null,
       d_bread:null,
       time_availible:0,
       time_choose:0,
   },

   methods: {
     init: function() {
        this.get_time();
    },

    get_time(){
        axios.post("time_data/",{
            'Accept': 'application/json'
            }).then(async response => {
                const all_data = await response.data;
                this.time_availible = JSON.parse(all_data)
                console.log(this.time_availible)
            });
    },

    clear(){
                this.name=null
                this.surname=null
                this.bdate=null
                this.sex=0
                this.shrt=0
                this.code=null
                this.phone=null
                this.email=null
                this.d_name=null
                this.d_bread=null

                this.time_choose=0
    },

    clear_invalid(){
       this.nisinvalid=false
       this.sisinvalid=false
       this.bisinvalid=false
       this.sisinvalid=false
       this.shisinvalid=false
       this.pisinvalid=false
       this.ndisinvalid=false
       this.bdisinvalid=false
       this.eisinvalid=false
       this.cisinvalid=false
       this.cheisinvalid=false
       this.che2isinvalid=false
       this.tcisinvalid=false
    },



    send_forms_data(){
        this.clear_invalid()
        this.bdate = document.getElementsByClassName('get')[0]['value'];
        count = 0
        if (this.check == false){
            this.cheisinvalid = true
            count+=1

            this.$toastr.defaultTimeout = 3000;
            this.$toastr.defaultPosition = "toast-top-right";
            this.$toastr.defaultStyle = { "background-color": "red" },
            this.$toastr.s("Sign agreements");

        }
        if (this.check2 == false){
            this.che2isinvalid = true
            count+=1

            this.$toastr.defaultTimeout = 3000;
            this.$toastr.defaultPosition = "toast-top-right";
            this.$toastr.defaultStyle = { "background-color": "red" },
            this.$toastr.s("Sign agreements");

        }
        if (this.name == null){
            this.nisinvalid = true
            count+=1
        }
        if (this.surname == null){
            this.sisinvalid = true
            count+=1
        }
        if (this.bdate === ''){
            this.bisinvalid = true
            count+=1
        }
         if (this.code == null){
            this.cisinvalid = true
            count+=1
        }
        if (this.sex == 0){
            this.sisinvalid = true
            count+=1
        }
        if (this.shrt == 0){
            this.shisinvalid = true
            count+=1
        }
        if (this.d_name == null){
            this.ndisinvalid = true
            count+=1
        }
        if (this.d_bread == null){
            this.bdisinvalid = true
            count+=1
        }
        if (this.phone == null){
            this.pisinvalid = true
            count+=1
        }

        if (this.time_choose == 0){
            this.tcisinvalid = true
            count+=1
        }



        if (this.email == null){
            this.eisinvalid = true
            count+=1
        }
        else{
            var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,5}$/

            if(!this.email.match(pattern)) {
                count+=1
                this.eisinvalid = true
                this.$toastr.defaultTimeout = 3000;
                this.$toastr.defaultPosition = "toast-top-right";
                this.$toastr.defaultStyle = { "background-color": "red" },
                this.$toastr.s("Invalid Email");
            }
        }


        if (this.phone != null){
            var pattern_ph = /^\d{9,12}$/
            if (!this.phone.match(pattern_ph) ) {
                count+=1
		        this.pisinvalid = true
                console.log(this.phone.length )
                this.$toastr.defaultTimeout = 3000;
                this.$toastr.defaultPosition = "toast-top-right";
                this.$toastr.defaultStyle = { "background-color": "red" },
                this.$toastr.s("incorrect phone format");
            }
        }
        if (this.code != null){
            var pattern_code = /^\+{0,1}\d{1,4}$/
            if (!this.code.match(pattern_code) ) {
                count+=1
		        this.cisinvalid = true
                this.$toastr.defaultTimeout = 3000;
                this.$toastr.defaultPosition = "toast-top-right";
                this.$toastr.defaultStyle = { "background-color": "red" },
                this.$toastr.s("incorrect code format");
            }
        }

        if (count == 0){

            data_request = {
                name:this.name,
                surname:this.surname,
                bdate:this.bdate,
                sex:this.sex,
                shrt:this.shrt,
                phone:this.phone,
                code:this.code,
                email:this.email,
                d_name:this.d_name,
                d_bread:this.d_bread,
                time_choose:this.time_choose,
            }
            console.log(data_request)
            axios.post("save_data/", data_request, {
            'Accept': 'application/json'
            }).then(async response => {
                const all_data = await response.data;
                if (all_data == 'true'){
                    this.clear()
                    window.location.replace("https://husk9-for-events-managing-99327.zbni.co/u/ARB0g");
    //              this.$toastr.defaultTimeout = 3000;
    //              this.$toastr.defaultPosition = "toast-top-right";
    //              this.$toastr.defaultStyle = { "background-color": "green" },
    //              this.$toastr.s("successfully registered");

                }
                else{
                  this.$toastr.defaultTimeout = 3000;
                  this.$toastr.defaultPosition = "toast-top-right";
                  this.$toastr.defaultStyle = { "background-color": "red" },
                  this.$toastr.s("Errors in adding");
                }
             });
          }
         else{
                  this.$toastr.defaultTimeout = 3000;
                  this.$toastr.defaultPosition = "toast-top-right";
                  this.$toastr.defaultStyle = { "background-color": "red" },
                  this.$toastr.s("Fill all inputs");
          }
    },

  },
  mounted: function () {
    this.init();
  }
})


