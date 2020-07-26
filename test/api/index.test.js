const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp)


describe('Bosh sahifani testdan otqizdik', () => {
    it(`Get metod orqali bosh sahifani tekshiruvdan o'tqazdik`, (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
})
