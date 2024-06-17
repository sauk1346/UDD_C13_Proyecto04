class Reserva {
    constructor(id, hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes) {
        this.id = id;
        this.hotel = hotel;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.tipo_habitacion = tipo_habitacion;
        this.estado = estado;
        this.num_huespedes = num_huespedes;
    }
}

module.exports = Reserva;
