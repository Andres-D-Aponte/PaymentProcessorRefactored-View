package com.payment.factory;

import com.payment.processor.*;

public class PaymentProcessorFactory {
    public static PaymentProcessor createProcessor(String paymentType) {
        return switch (paymentType.toUpperCase()) {
            case "CREDIT_CARD" -> new CreditCardProcessor();
            case "DEBIT_CARD" -> new DebitCardProcessor();
            case "PAYPAL" -> new PayPalProcessor();
            case "BITCOIN" -> new BitcoinProcessor();
            default -> throw new IllegalArgumentException("Unsupported payment method: " + paymentType);
        };
    }
}