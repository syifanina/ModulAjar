// Prisma Segitiga - 5 Sisi | 9 Rusuk | 6 Sudut
(function() {
    const s = 2.4, h = 3.0, r = s/Math.sqrt(3), y1=-h/2, y2=h/2;

    function tv(i, y) {
        const a = (i*2*Math.PI/3) - Math.PI/2;
        return new THREE.Vector3(r*Math.cos(a), y, r*Math.sin(a));
    }
    const A1=tv(0,y1), B1=tv(1,y1), C1=tv(2,y1);
    const A2=tv(0,y2), B2=tv(1,y2), C2=tv(2,y2);

    window.SHAPE_INFO = {
        count: { sisi: 5, rusuk: 9, sudut: 6 },
        info: {
            sisi:   "Prisma segitiga memiliki <b>5 sisi</b>:<br>2 sisi alas (segitiga) + 3 sisi tegak (persegi panjang)",
            rusuk:  "Prisma segitiga memiliki <b>9 rusuk</b>:<br>3 rusuk alas bawah + 3 rusuk alas atas + 3 rusuk tegak",
            sudut:  "Prisma segitiga memiliki <b>6 titik sudut</b>:<br>3 titik di alas bawah + 3 titik di alas atas",
            jaring: "Jaring-jaring prisma segitiga terdiri dari <b>2 segitiga</b> (alas & tutup) dan <b>3 persegi panjang</b> (sisi tegak). Tekan <b>Buka Jaring-Jaring</b>!"
        },
        faces: [
            { verts:[A1,B1,C1], color:0x48dbfb, name:"Sisi Alas Bawah" },
            { verts:[A2,B2,C2], color:0x0fbcf9, name:"Sisi Alas Atas" },
            { verts:[A1,B1,B2,A2], color:0xff6b81, name:"Sisi Tegak 1" },
            { verts:[B1,C1,C2,B2], color:0xffa502, name:"Sisi Tegak 2" },
            { verts:[C1,A1,A2,C2], color:0x2ed573, name:"Sisi Tegak 3" },
        ],
        edges: [[A1,B1],[B1,C1],[C1,A1],[A2,B2],[B2,C2],[C2,A2],[A1,A2],[B1,B2],[C1,C2]],
        vertices: [A1, B1, C1, A2, B2, C2]
    };
})();
