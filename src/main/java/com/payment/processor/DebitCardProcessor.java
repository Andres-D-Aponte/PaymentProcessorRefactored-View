package com.payment.processor;

import com.payment.model.Payment;

public class DebitCardProcessor implements PaymentProcessor {
    private static final double COMMISSION_RATE = 0.01;
    private static final double THRESHOLD = 500.0;
    private static final double ADDITIONAL_FEE = 5.0;

    @Override
    public double processPayment(Payment payment) {
        if (!validatePayment(payment)) {
            throw new IllegalArgumentException("Invalid payment");
        }

        double amount = payment.getAmount();
        double commission = calculateCommission(amount);
        double additionalFees = calculateAdditionalFees(amount);
        
        System.out.println("Processing debit card payment");
        return amount + commission + additionalFees;
    }

    @Override
    public boolean validatePayment(Payment payment) {
        return payment != null && payment.getAmount() > 0;
    }

    @Override
    public double calculateCommission(double amount) {
        return amount * COMMISSION_RATE;
    }

    @Override
    public double calculateAdditionalFees(double amount) {
        return amount > THRESHOLD ? ADDITIONAL_FEE : 0;
    }
}