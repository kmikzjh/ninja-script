// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::fs::File;
use std::fs::create_dir_all;
use std::io::{Read, Write};
use std::env;
use dirs::home_dir;

fn write_temp_js_file(content: &str, dir: &str)  -> std::io::Result<()> {
    let _ = create_dir_all(dir);
    let temp_file = format!("{}temp_js_file.ts",dir);

    let mut file = File::create(temp_file)?;
    file.write_all(content.as_bytes())?;
    Ok(())
}

#[tauri::command]
fn exec_bun(input_code: &str, data_path: &str) -> String {
    let h_dir = home_dir().unwrap();
    let home_path: String =String::from(h_dir.to_string_lossy());
    let temp_directory = data_path;
    let _ = write_temp_js_file(input_code, &temp_directory);
    let temp_file = format!("{}temp_js_file.ts", temp_directory);
    let mut bun_command = Command::new(format!("{}/.bun/bin/bun", home_path)).arg(temp_file)
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .expect("no se pudo ejecutar el proceso");
    let result = bun_command.wait().expect("Error al esperar por el proceso");
    if result.success() {
        let mut stdout = bun_command.stdout.expect("No se encontró ninguna salida");
        let mut output = String::new();
        let _ = stdout.read_to_string(&mut output);
        format!("{}", output)
    } else {
        let mut stderr = bun_command.stderr.expect("No se encontró ninguna salida");
        let mut output = String::new();
        let _ = stderr.read_to_string(&mut output);
        format!("{}", output.replace(temp_directory, "").replace("temp_js_file.ts", "line"))
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![exec_bun])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
