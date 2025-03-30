router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await conexion.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error en backend:", error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
});

