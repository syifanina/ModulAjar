// Limas Segitiga (Tetrahedron) - 4 Sisi | 6 Rusuk | 4 Sudut
(function() {
    const s = 2.5;
    const h = s * Math.sqrt(2/3);
    const r = s / Math.sqrt(3);

    const A = new THREE.Vector3(r, 0, 0);
    const B = new THREE.Vector3(-r/2, 0,  s/2);
    const C = new THREE.Vector3(-r/2, 0, -s/2);
    const D = new THREE.Vector3(0, h, 0);

    window.SHAPE_INFO = {
        count: { sisi: 4, rusuk: 6, sudut: 4 },
        info: {
            sisi:   "Limas segitiga memiliki <b>4 sisi</b>:<br>1 sisi alas (segitiga) + 3 sisi tegak (segitiga)",
            rusuk:  "Limas segitiga memiliki <b>6 rusuk</b>:<br>3 rusuk alas + 3 rusuk tegak",
            sudut:  "Limas segitiga memiliki <b>4 titik sudut</b>:<br>3 titik alas + 1 titik puncak",
            jaring: "Jaring-jaring limas segitiga terdiri dari <b>1 segitiga alas</b> dan <b>3 segitiga tegak</b>. Tekan tombol <b>Buka Jaring-Jaring</b> untuk melihat animasinya!"
        },
        faces: [
            { verts:[A,B,C], color:0x48dbfb, name:"Sisi Alas" },
            { verts:[A,B,D], color:0xff6b81, name:"Sisi Tegak 1" },
            { verts:[B,C,D], color:0xffa502, name:"Sisi Tegak 2" },
            { verts:[A,C,D], color:0x2ed573, name:"Sisi Tegak 3" },
        ],
        edges: [[A,B],[B,C],[A,C],[A,D],[B,D],[C,D]],
        vertices: [A, B, C, D]
    };
})();
