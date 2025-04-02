package com.payment;

import com.payment.service.PaymentService;
import java.util.Scanner;

public class Main {
    private static final PaymentService paymentService = new PaymentService();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            try {
                showMenu();
                int option = getOption();
                
                if (option == 5) {
                    System.out.println("¡Gracias por usar nuestro sistema de pagos!");
                    break;
                }
                
                String paymentType = getPaymentType(option);
                double amount = getAmount();
                
                double totalAmount = paymentService.processPayment(paymentType, amount, "USD");
                System.out.printf("\nMonto total (incluyendo comisiones y cargos): %.2f USD%n", totalAmount);
                
            } catch (IllegalArgumentException e) {
                System.err.println("Error: " + e.getMessage());
            } catch (Exception e) {
                System.err.println("Error inesperado: " + e.getMessage());
            }
            
            System.out.println("\nPresione ENTER para continuar...");
            scanner.nextLine();
        }
        
        scanner.close();
    }

    private static void showMenu() {
        System.out.println("\n=== SISTEMA DE PROCESAMIENTO DE PAGOS ===");
        System.out.println("1. Pago con Tarjeta de Crédito");
        System.out.println("2. Pago con Tarjeta de Débito");
        System.out.println("3. Pago con PayPal");
        System.out.println("4. Pago con Bitcoin");
        System.out.println("5. Salir");
        System.out.println("=======================================");
    }

    private static int getOption() {
        while (true) {
            System.out.print("Seleccione una opción (1-5): ");
            try {
                int option = Integer.parseInt(scanner.nextLine());
                if (option >= 1 && option <= 5) {
                    return option;
                }
                System.out.println("Por favor, seleccione una opción válida (1-5)");
            } catch (NumberFormatException e) {
                System.out.println("Por favor, ingrese un número válido");
            }
        }
    }

    private static String getPaymentType(int option) {
        return switch (option) {
            case 1 -> "CREDIT_CARD";
            case 2 -> "DEBIT_CARD";
            case 3 -> "PAYPAL";
            case 4 -> "BITCOIN";
            default -> throw new IllegalArgumentException("Opción de pago no válida");
        };
    }

    private static double getAmount() {
        while (true) {
            System.out.print("Ingrese el monto a pagar: ");
            try {
                double amount = Double.parseDouble(scanner.nextLine());
                if (amount > 0) {
                    return amount;
                }
                System.out.println("Por favor, ingrese un monto mayor a 0");
            } catch (NumberFormatException e) {
                System.out.println("Por favor, ingrese un monto válido");
            }
        }
    }
}