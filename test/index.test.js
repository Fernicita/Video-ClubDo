const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de auteticación", ()=>{
    it("Debería de obtener un login con un user y un pass ok",(done)=>{
        supertest(app).post("/login")
        .send({"email":"ferni@uach.mx", "password":"123"})
        .expect(200)
        .end(function(err,res){
            if(err){
                done(err);
            }else{
                done(); //en limpio dice que la prueba es exitosa
            }

        });
    });
    it('Deberia de rechazar un login con user y pass incorrectos', (done)=>{
        supertest(app).post('/login')
        .send({"email": "abc@gmail.com", "password": "abcd"})
        .expect(403)
        .end(function(err, res){
            if(err){
                done(err)
            }else{
                done();
            }
        })
    })

});
    