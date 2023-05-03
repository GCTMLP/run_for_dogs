let app = new Vue({
  el: "#reg",
  delimiters: ["{", "}"],
   data: {
       nisinvalid:false,
       sisinvalid:false,
       bisinvalid:false,
       sisinvalid:false,
       scisinvalid:false,
       shisinvalid:false,
       pisinvalid:false,
       disinvalid:false,
       dnisinvalid:false,
       dbisinvalid:false,
       dbdisinvalid:false,
       eisinvalid:false,
       cisinvalid:false,
       tisinvalid:false,
       cheisinvalid:false,
       name:null,
       check:false,
       surname:null,
       bdate:null,
       sex:0,
       shrt:0,
       phone:null,
       code:null,
       email:null,
       dog:0,
       d_name:null,
       d_bread:null,
       d_bdate:null,
       sick:0,
       sick_text:null,
       adopt:0,
   },

   methods: {

    clear(){
                this.name=null
                this.surname=null
                this.bdate=null
                this.sex=0
                this.shrt=0
                this.code=null
                this.phone=null
                this.email=null
                this.dog=0
                this.d_name=null
                this.d_bread=null
                this.d_bdate=null
                this.adopt=0
    },

    clear_invalid(){
       this.nisinvalid=false
       this.sisinvalid=false
       this.bisinvalid=false
       this.sisinvalid=false
       this.scisinvalid=false
       this.shisinvalid=false
       this.pisinvalid=false
       this.disinvalid=false
       this.dnisinvalid=false
       this.dbisinvalid=false
       this.dbdisinvalid=false
       this.eisinvalid=false
       this.cisinvalid=false
       this.tisinvalid=false
       this.cheisinvalid=false
    },

    send_forms_data(){
        this.clear_invalid()
        var bdate = document.getElementsByClassName('get')[0]['value'];
        count = 0
        console.log(count)
        if (this.check == false){
            this.cheisinvalid = true
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
        if (bdate === ''){
            console.log(bdate)
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
        if (this.phone == null){
            this.pisinvalid = true
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
        if (this.dog == 0){
            this.disinvalid = true
            count+=1
        }
        if (this.dog == '1' && this.sick == 0){
            this.scisinvalid = true
            count+=1
        }
        if (this.dog == '1' && this.sick == '1' && this.sick_text == null){
            this.tisinvalid = true
            count+=1
        }

        if (this.dog === '1' && this.d_name == null){
            this.dnisinvalid = true
            console.log(this.dog)
            count+=1
        }
        if (this.dog === '1' && this.d_bread == null){
            this.dbisinvalid = true
            count+=1
        }
//        if (this.dog == '1' && this.d_bdate == null){
//            this.dbdisinvalid = true
//            count+=1
//        }
        if (this.phone != null){
            if (this.phone.length < 9 || this.phone.length > 12) {
                count+=1
		        this.pisinvalid = true
                console.log(this.phone.length )
                this.$toastr.defaultTimeout = 3000;
                this.$toastr.defaultPosition = "toast-top-right";
                this.$toastr.defaultStyle = { "background-color": "red" },
                this.$toastr.s("incorrect phone format");
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
                dog:this.dog,
                d_name:this.d_name,
                d_bread:this.d_bread,
                d_bdate:this.d_bdate,
                sick:this.sick,
                sick_text:this.sick_text,
                adopt:this.adopt,
            }

            axios.post("save_data/", data_request, {
            'Accept': 'application/json'
            }).then(async response => {
                const all_data = await response.data;
                if (all_data == 'true'){
                    this.clear()
                    window.location.replace("https://husk9-for-events-managing-99327.zbni.co/products/run-for-dogs-2k-race-in-damac-hills-2");
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

})


