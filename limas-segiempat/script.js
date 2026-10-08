// Limas Segiempat (Square Pyramid) - 5 Sisi | 8 Rusuk | 5 Sudut
(function() {
    const s = 2.2, h = 2.8, hs = s/2;

    const A = new THREE.Vector3( hs, 0,  hs);
    const B = new THREE.Vector3(-hs, 0,  hs);
    const C = new THREE.Vector3(-hs, 0, -hs);
    const D = new THREE.Vector3( hs, 0, -hs);
    const T = new THREE.Vector3(0, h, 0);

    window.SHAPE_INFO = {
        count: { sisi: 5, rusuk: 8, sudut: 5 },
        info: {
            sisi:   "Limas segiempat memiliki <b>5 sisi</b>:<br>1 sisi alas (persegi) + 4 sisi tegak (segitiga)",
            rusuk:  "Limas segiempat memiliki <b>8 rusuk</b>:<br>4 rusuk alas + 4 rusuk tegak",
            sudut:  "Limas segiempat memiliki <b>5 titik sudut</b>:<br>4 titik alas + 1 titik puncak",
            jaring: "Jaring-jaring limas segiempat terdiri dari <b>1 persegi alas</b> dan <b>4 segitiga tegak</b>. Tekan tombol <b>Buka Jaring-Jaring</b> untuk melihat animasinya!"
        },
        faces: [
            { verts:[A,B,C,D], color:0x48dbfb, name:"Sisi Alas (Persegi)" },
            { verts:[A,B,T],   color:0xff6b81, name:"Sisi Tegak 1" },
            { verts:[B,C,T],   color:0xffa502, name:"Sisi Tegak 2" },
            { verts:[C,D,T],   color:0x2ed573, name:"Sisi Tegak 3" },
            { verts:[D,A,T],   color:0xeccc68, name:"Sisi Tegak 4" },
        ],
        edges: [[A,B],[B,C],[C,D],[D,A],[A,T],[B,T],[C,T],[D,T]],
        vertices: [A, B, C, D, T]
    };
})();
