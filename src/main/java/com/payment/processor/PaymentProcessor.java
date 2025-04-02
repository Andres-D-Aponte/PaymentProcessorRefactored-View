package com.payment.processor;

import com.payment.model.Payment;

public interface PaymentProcessor {
    double processPayment(Payment payment);
    boolean validatePayment(Payment payment);
    double calculateCommission(double amount);
    double calculateAdditionalFees(double amount);
}