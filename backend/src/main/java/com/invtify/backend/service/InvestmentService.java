package com.invtify.backend.service;

import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.model.investment.InvestmentStrategy;
import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class InvestmentService {
    private final InvestmentRepository investmentRepository;
    private final UserService userService;

    public Collection<InvestmentModel> getInvestments(String userId) {
        User user = userService.getUser(userId);
        return user.getInvestments().stream().map(InvestmentModel::create).toList();
    }

    public void setInvestment(String userId, InvestmentStrategy investmentStrategy) {
        User user = userService.getUser(userId);
        createInvestment(user, investmentStrategy);
    }

    public void createInvestment(User user, InvestmentStrategy investmentStrategy) {
        Investment investment = new Investment();
        editInvestment(user, investment, investmentStrategy);
    }

    public void editInvestment(User user, Investment investment, InvestmentStrategy investmentStrategy) {
        investment.setUser(user);
        investment.setAsset(investmentStrategy.getAsset());
        investment.setStrategy(investmentStrategy.getStrategy());
        investment.setFrequencyType(investmentStrategy.getFrequency().type());
        investment.setFrequencyDay(investmentStrategy.getFrequency().day());
        investment.setFrequencyHour(investmentStrategy.getFrequency().hour());
        investment.setAmount(investment.getAmount());
        investmentRepository.save(investment);
    }


    public boolean deleteInvestment(String userId, long investmentId) {
        Investment investment = investmentRepository.findById(investmentId).orElse(null);
        if (investment == null) return false;
        if (!investment.getUser().getId().equals(userId)) {
            return false;
        }
        investmentRepository.deleteById(investmentId);
        return true;
    }
}
