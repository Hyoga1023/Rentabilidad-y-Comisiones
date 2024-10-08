function mostrarSeccion(seccion) {
    document.getElementById('ahorroVoluntario').style.display = 'none';
    document.getElementById('cesantias').style.display = 'none';
    document.getElementById(seccion).style.display = 'block';
}

function formatearNumeroConSeparadores(numero) {
    // Usa toLocaleString para agregar separadores de miles
    return numero.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularRentabilidad(tipo) {
    let idMonto = tipo === 'ahorroVoluntario' ? 'montoAhorro' : 'montoCesantias';
    let idPorcentaje = tipo === 'ahorroVoluntario' ? 'porcentajeAhorro' : 'porcentajeCesantias';

    // Obtener los valores de los inputs
    const montoInput = document.getElementById(idMonto);
    const porcentajeInput = document.getElementById(idPorcentaje);
    
    const monto = parseFloat(montoInput.value);
    const porcentaje = parseFloat(porcentajeInput.value);

    if (isNaN(monto) || monto > 200000000) {
        alert('Por favor, ingrese un monto válido no mayor a $200,000,000');
        return;
    }

    const rentabilidadAnual = monto * (porcentaje / 100);
    const rentabilidadMensual = rentabilidadAnual / 12;
    const rentabilidadDiaria = rentabilidadAnual / 365;

    const resultadosDiv = document.getElementById(tipo === 'ahorroVoluntario' ? 'resultadosAhorro' : 'resultadosCesantias');
    resultadosDiv.innerHTML = `
        <p>Rentabilidad Diaria: $${formatearNumeroConSeparadores(rentabilidadDiaria)}</p>
        <p>Rentabilidad Mensual: $${formatearNumeroConSeparadores(rentabilidadMensual)}</p>
        <p>Rentabilidad Anual: $${formatearNumeroConSeparadores(rentabilidadAnual)}</p>
    `;

    const comisionPorcentaje = tipo === 'ahorroVoluntario' ? 0.00223 : 0.00712;
    const comision = monto * comisionPorcentaje;
    const comisionDiv = document.getElementById(tipo === 'ahorroVoluntario' ? 'comisionAhorro' : 'comisionCesantias');
    comisionDiv.innerHTML = `Comisión del Asesor: $${formatearNumeroConSeparadores(comision)}`;
}
function limpiarCampos(tipo) {
    let idMonto = tipo === 'ahorroVoluntario' ? 'montoAhorro' : 'montoCesantias';
    let idPorcentaje = tipo === 'ahorroVoluntario' ? 'porcentajeAhorro' : 'porcentajeCesantias';
    let idResultados = tipo === 'ahorroVoluntario' ? 'resultadosAhorro' : 'resultadosCesantias';
    let idComision = tipo === 'ahorroVoluntario' ? 'comisionAhorro' : 'comisionCesantias';

    // Limpiar campos de entrada
    document.getElementById(idMonto).value = '';
    document.getElementById(idPorcentaje).selectedIndex = 0;

    // Limpiar resultados
    document.getElementById(idResultados).innerHTML = '';
    document.getElementById(idComision).innerHTML = '';
}