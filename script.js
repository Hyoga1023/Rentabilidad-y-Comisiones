// Función para formatear número con separadores de miles
function formatNumber(number) {
    return new Intl.NumberFormat('es-CO').format(number);
}

// Función para limpiar el formato y obtener solo números
function cleanNumber(number) {
    return number.replace(/\D/g, '');
}

// Función para manejar el input y mantener el cursor en la posición correcta
function handleInput(input) {
    // Guardar la posición del cursor
    const start = input.selectionStart;
    const end = input.selectionEnd;
    
    // Obtener solo los números del valor actual
    const value = cleanNumber(input.value);
    
    // Si no hay valor, limpiar el campo
    if (!value) {
        input.value = '';
        return;
    }
    
    // Formatear el número
    const formattedValue = formatNumber(value);
    
    // Calcular la diferencia de longitud para ajustar el cursor
    const lengthDiff = formattedValue.length - input.value.length;
    
    // Actualizar el valor del input
    input.value = formattedValue;
    
    // Reposicionar el cursor
    if (start) {
        input.setSelectionRange(start + lengthDiff, end + lengthDiff);
    }
}

function mostrarSeccion(seccion) {
    document.getElementById('ahorroVoluntario').style.display = 'none';
    document.getElementById('cesantias').style.display = 'none';
    document.getElementById(seccion).style.display = 'block';
}

function formatearNumeroConSeparadores(numero) {
    return numero.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularRentabilidad(tipo) {
    let idMonto = tipo === 'ahorroVoluntario' ? 'montoAhorro' : 'montoCesantias';
    let idPorcentaje = tipo === 'ahorroVoluntario' ? 'porcentajeAhorro' : 'porcentajeCesantias';

    // Obtener los valores de los inputs
    const montoInput = document.getElementById(idMonto);
    const porcentajeInput = document.getElementById(idPorcentaje);
    
    // Limpiar el formato para obtener solo el número
    const monto = parseFloat(cleanNumber(montoInput.value));
    const porcentaje = parseFloat(porcentajeInput.value);

    if (isNaN(monto) || monto > 300000000) {
        alert('Por favor, ingrese un monto válido no mayor a $300,000,000');
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

// Agregar los event listeners cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar los inputs numéricos
    const montoAhorro = document.getElementById('montoAhorro');
    const montoCesantias = document.getElementById('montoCesantias');
    
    // Agregar el evento input a ambos campos
    montoAhorro.addEventListener('input', function() {
        handleInput(this);
    });
    
    montoCesantias.addEventListener('input', function() {
        handleInput(this);
    });
});