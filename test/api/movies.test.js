const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp)

describe('/api/movieslarni testan otqizyamiz', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({
                username: 'Q.Xojimurod',
                password: '12345'
            })
            .end((err, res) => {
                token = res.body.token
                done()
            })
    })

    describe('/GET movies', () => {
        it('Get metodi orqali movieslarni tekshirdik', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done()
                })
        })
    })

    // post orqali yengi malumot kiritish testi 
    describe('POST movies', () => {
        it('POST metodi orqali  yengi movieslarni kirgizamiz', (done) => {
            const movie = {
                title: 'Yoldagi yolak',
                category: 'Bilmadim',
                country: 'Uzbek',
                year: 2019,
                director_id: '5f0995f0d8588d1688dd253b',
                imdb_score: 9
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('imdb_score')
                    movieID = res.body._id
                    done()
                })
        })
    })

    // GET orqali Id korishimiz kere 
    describe('GET movies', () => {
        it('GET metodi orqali  ID qidirvomiz', (done) => {
            chai.request(server)
                .get(`/api/movies/${movieID}`)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('imdb_score')
                    res.body.should.have.property('_id').eql(movieID)
                    done()
                })
        })
    })



})