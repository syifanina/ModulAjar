// Limas Segilima (Pentagonal Pyramid) - 6 Sisi | 10 Rusuk | 6 Sudut
(function() {
    const R = 2.0, h = 2.8;

    function pv(i) {
        const angle = (i * 2*Math.PI/5) - Math.PI/2;
        return new THREE.Vector3(R*Math.cos(angle), 0, R*Math.sin(angle));
    }
    const verts = [0,1,2,3,4].map(pv);
    const [A,B,C,D,E] = verts;
    const T = new THREE.Vector3(0, h, 0);

    window.SHAPE_INFO = {
        count: { sisi: 6, rusuk: 10, sudut: 6 },
        info: {
            sisi:   "Limas segilima memiliki <b>6 sisi</b>:<br>1 sisi alas (segi lima) + 5 sisi tegak (segitiga)",
            rusuk:  "Limas segilima memiliki <b>10 rusuk</b>:<br>5 rusuk alas + 5 rusuk tegak",
            sudut:  "Limas segilima memiliki <b>6 titik sudut</b>:<br>5 titik alas + 1 titik puncak",
            jaring: "Jaring-jaring limas segilima terdiri dari <b>1 segi lima alas</b> dan <b>5 segitiga tegak</b>. Tekan tombol <b>Buka Jaring-Jaring</b>!"
        },
        faces: [
            { verts:[A,B,C,D,E], color:0x48dbfb, name:"Sisi Alas (Segi Lima)" },
            { verts:[A,B,T], color:0xff6b81, name:"Sisi Tegak 1" },
            { verts:[B,C,T], color:0xffa502, name:"Sisi Tegak 2" },
            { verts:[C,D,T], color:0x2ed573, name:"Sisi Tegak 3" },
            { verts:[D,E,T], color:0xeccc68, name:"Sisi Tegak 4" },
            { verts:[E,A,T], color:0xa29bfe, name:"Sisi Tegak 5" },
        ],
        edges: [[A,B],[B,C],[C,D],[D,E],[E,A],[A,T],[B,T],[C,T],[D,T],[E,T]],
        vertices: [...verts, T]
    };
})();
